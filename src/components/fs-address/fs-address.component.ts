import { FormControl } from '@angular/forms';
import { Component, Output, Input, OnInit, OnDestroy, ViewChild,
  EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { isBoolean, isArrayLikeObject, filter, remove, uniqueId } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GoogleMapsAPIWrapper, MapsAPILoader, AgmMap, AgmMarker, MarkerManager } from '@agm/core';
import { COUNTRIES } from '../../constants/countries';
import { NgForm, ControlContainer} from '@angular/forms';
import { FsAddress } from '../../interfaces';
declare var google: any;

@Component({
  selector: 'fs-address',
  templateUrl: './fs-address.component.html',
  styleUrls: ['./fs-address.component.scss'],
  // HACK: allow access from the parent form to inputs in child component
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FsAddressComponent implements OnInit, OnDestroy {

  @ViewChild(AgmMap) agmMap;
  @ViewChild(AgmMarker) agmMarker;
  @Input() address: FsAddress = {};
  @Input() config = null;
  @Output() change = new EventEmitter<any>();

  private GoogleMapKey: string;
  regions = [];
  countries = {
    domestic: [],
    international: []
  };
  zipLabel = '';
  regionLabel = '';
  center = null;
  searched = false;
  searchedAddress = '';
  map = null;
  mapOptions = null;
  marker = null;
  mapReady$;

  constructor(private _wrapper: GoogleMapsAPIWrapper, private markerManager: MarkerManager) { }

  ngOnInit() {
    this.config = Object.assign({}, {
      cords: {
        lat: 43.6379967,
        lng: -79.3819992
      },
      address2: true,
      disabled: false,
      domestics: ['CA', 'US'],
      map: true
      }, this.config);

      this.address.lat = this.address.lat || '';
      this.address.lng = this.address.lng || '';

      this.map = {
        center: {
          latitude: this.address.lat || this.config.cords.lat,
          longitude: this.address.lng || this.config.cords.lng
        },
        zoom: 13
      };

      this.mapOptions = Object.assign({
          scrollwheel: false,
          streetViewControl: false,
          mapTypeControlOptions: { mapTypeIds: [] }
        },
        this.mapOptions || {}
      );

      this.marker = {
        id: 0,
        coords: { latitude: this.address.lat, longitude: this.address.lng },
        options: { draggable: true },
        events: {
          dragend: marker => {
            this.address.lat = marker.coords.lat;
            this.address.lng = marker.coords.lng;
          }
        }
      };

      for (const item of ['address', 'address2', 'city', 'region', 'country', 'zip']) {

        let option = this.config[item];

          if (isBoolean(option)) {
              option = { show: this.config[item] };
          }

          if (!isArrayLikeObject(this.config[item])) {
              option = {};
          }

          if (!option.id) {
              option.id = 'input_' + uniqueId();
          }

          if (!option.name) {
              option.name = item;
          }

          this.config[item] = option;
      };

      let countries = [];
      if (this.config.countries) {
          for (let code of this.config.countries) {

              let country = filter(COUNTRIES, { code: code })[0];

              if (country) {
                  countries.push(country);
              }
          } ;

      } else {
          countries = COUNTRIES.slice();
      }

      if (this.config.domestics) {

        this.countries.international = countries;

        for (let i = this.config.domestics.length - 1; i >= 0; i--) {

          let item = remove(this.countries.international, { code: this.config.domestics[i] })[0];

          if (item) {
            this.countries.domestic.unshift(item);
          }
        }

      } else {
        this.countries.domestic = countries;
      }

      if (!this.address.country && this.countries.domestic[0]) {
        this.address.country = this.countries.domestic[0].code;
      }

      if (this.address[this.config.country.name]) {
        this.changeCountry();
      }

      // Example ready event. Allow to use google object and map instance
      if (this.agmMap) {
        this.mapReady$ = this.agmMap.mapReady.subscribe(map => {

          this.agmMap.triggerResize();

          if (this.address[this.config.address.name] ||
            this.address[this.config.address2.name] ||
            this.address[this.config.city.name] ||
            this.address[this.config.region.name] ||
            this.address[this.config.zip.name]) {
              this.address.lat = 9999;
              this.address.lng = 9999;
              this.search();
          }
        });
      }
  }

  recenter() {
    this.map.center = { latitude: this.address.lat, longitude: this.address.lng };
    this.marker.coords.latitude = this.address.lat;
    this.marker.coords.longitude = this.address.lng;
    this.agmMap.triggerResize()
    .then(() =>  this.agmMap._mapsWrapper.setCenter({lat: this.address.lat, lng: this.address.lng}));
  }

  changeCountry() {
    const country = filter(COUNTRIES, { code: this.address[this.config.country.name] })[0];
    this.regions = country ? country.regions : [];
    this.zipLabel = country && country.code == 'CA' ? 'Postal Code' : 'Zip';
    this.regionLabel = country && country.code == 'CA' ? 'Province' : 'State';
  }

  search() {
    let geocoder = new google.maps.Geocoder();
    let country = filter(COUNTRIES, { code: this.address.country })[0] || {};
    let parts = [	this.address[this.config.address.name],
                  this.address[this.config.city.name],
                  this.address[this.config.region.name],
                  country.name
          ];
    this.searchedAddress = parts.join(', ');
    geocoder.geocode( { address: this.searchedAddress  }, (results, status) => {
      this.searched = true;

      if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        let location = results[0].geometry.location;
        this.address.lat = location.lat();
        this.address.lng = location.lng();
        this.map.center = { latitude: parseFloat(location.lat()), longitude: parseFloat(location.lng()) };

        this.marker.coords.latitude = location.lat();
        this.marker.coords.longitude = location.lng();

        if (this.agmMap) {
          this.agmMap.triggerResize();
        }

      } else {
        this.address.lat = null;
        this.address.lng = null;
      }
    });
    this.change.emit(this.address);
  }

  ngOnDestroy() {
    if (this.agmMap) {
      this.mapReady$.unsubscribe();
    }
  }
}
