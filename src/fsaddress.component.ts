import { FormControl } from '@angular/forms';
import { Component, AfterViewInit, Output, Input, OnInit, OnDestroy, Inject, ViewChild, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { FsUtil, FsArray } from '@firestitch/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GoogleMapsAPIWrapper, MapsAPILoader, AgmMap, AgmMarker, MarkerManager } from '@agm/core';
import { COUNTRIES } from './countries';
import { NgForm, ControlContainer} from '@angular/forms';
declare var google: any;

export interface FsAddress {
  country?: string
  state?: string,
  region?: string,
  address?: string,
  city?: string,
  zip?: string,
  lat?: string | number,
  lng?: string | number
}

@Component({
  selector: 'fs-address',
  templateUrl: './fsaddress.component.html',
  styleUrls: ['./fsaddress.component.scss'],
  // HACK: allow access from the parent form to inputs in child component
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FsAddressComponent implements OnInit, OnDestroy {

  @ViewChild(AgmMap) agmMap;
  @ViewChild(AgmMarker) agmMarker;
  @Input() fsAddress: FsAddress = {};
  @Input() fsAddressConfig = null;
  @Output() onChange = new EventEmitter<any>();

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

  constructor(private fsUtil: FsUtil, private fsArray: FsArray,
    private _wrapper: GoogleMapsAPIWrapper, private markerManager: MarkerManager) { }

  ngOnInit() {
    this.fsAddressConfig = Object.assign({}, {
      cords: {
        lat: 43.6379967,
        lng: -79.3819992
      },
      address2: true,
      disabled: false,
      domestics: ['CA', 'US'],
      map: true
      }, this.fsAddressConfig);

      this.fsAddress.lat = this.fsAddress.lat || '';
      this.fsAddress.lng = this.fsAddress.lng || '';

      this.map = {
        center: {
          latitude: this.fsAddress.lat || this.fsAddressConfig.cords.lat,
          longitude: this.fsAddress.lng || this.fsAddressConfig.cords.lng
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
        coords: { latitude: this.fsAddress.lat, longitude: this.fsAddress.lng },
        options: { draggable: true },
        events: {
          dragend: marker => {
            this.fsAddress.lat = marker.coords.lat;
            this.fsAddress.lng = marker.coords.lng;
          }
        }
      };

      for (const item of ['address', 'address2', 'city', 'region', 'country', 'zip']) {

        let option = this.fsAddressConfig[item];

          if (this.fsUtil.isBoolean(option)) {
              option = { show: this.fsAddressConfig[item] };
          }

          if (!this.fsUtil.isObject(this.fsAddressConfig[item])) {
              option = {};
          }

          if (!option.id) {
              option.id = 'input_' + this.fsUtil.guid();
          }

          if (!option.name) {
              option.name = item;
          }

          this.fsAddressConfig[item] = option;
      };

      let countries = [];
      if (this.fsAddressConfig.countries) {
          for (let code of this.fsAddressConfig.countries) {

              let country = this.fsArray.filter(COUNTRIES, { code: code })[0];

              if (country) {
                  countries.push(country);
              }
          } ;

      } else {
          countries = COUNTRIES.slice();
      }

      if (this.fsAddressConfig.domestics) {

        this.countries.international = countries;

        for (let i = this.fsAddressConfig.domestics.length - 1; i >= 0; i--) {

          let item = this.fsArray.remove(this.countries.international, { code: this.fsAddressConfig.domestics[i] })[0];

          if (item) {
            this.countries.domestic.unshift(item);
          }
        }

      } else {
        this.countries.domestic = countries;
      }

      if (!this.fsAddress.country && this.countries.domestic[0]) {
        this.fsAddress.country = this.countries.domestic[0].code;
      }

      if (this.fsAddress[this.fsAddressConfig.country.name]) {
        this.changeCountry();
      }

      // Example ready event. Allow to use google object and map instance
      if (this.agmMap) {
        this.mapReady$ = this.agmMap.mapReady.subscribe(map => {
          // console.log(google);
          // console.log(map);
          this.agmMap.triggerResize();

          if (this.fsAddress[this.fsAddressConfig.address.name] ||
            this.fsAddress[this.fsAddressConfig.address2.name] ||
            this.fsAddress[this.fsAddressConfig.city.name] ||
            this.fsAddress[this.fsAddressConfig.region.name] ||
            this.fsAddress[this.fsAddressConfig.zip.name]) {
              this.fsAddress.lat = 9999;
              this.fsAddress.lng = 9999;
              this.search();
          }
        });
      }
  }

  recenter() {
    this.map.center = { latitude: this.fsAddress.lat, longitude: this.fsAddress.lng };
    this.marker.coords.latitude = this.fsAddress.lat;
    this.marker.coords.longitude = this.fsAddress.lng;
    this.agmMap.triggerResize()
    .then(() =>  this.agmMap._mapsWrapper.setCenter({lat: this.fsAddress.lat, lng: this.fsAddress.lng}));
  }

  changeCountry() {
    const country = this.fsArray.filter(COUNTRIES, { code: this.fsAddress[this.fsAddressConfig.country.name] })[0];
    this.regions = country ? country.regions : [];
    this.zipLabel = country && country.code == 'CA' ? 'Postal Code' : 'Zip';
    this.regionLabel = country && country.code == 'CA' ? 'Province' : 'State';
  }

  search() {
    let geocoder = new google.maps.Geocoder();
    let country = this.fsArray.filter(COUNTRIES, { code: this.fsAddress.country })[0] || {};
    let parts = [	this.fsAddress[this.fsAddressConfig.address.name],
                  this.fsAddress[this.fsAddressConfig.city.name],
                  this.fsAddress[this.fsAddressConfig.region.name],
                  country.name
          ];
    this.searchedAddress = parts.join(', ');
    geocoder.geocode( { 'address': this.searchedAddress  }, (results, status) => {
      this.searched = true;

      if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        let location = results[0].geometry.location;
        this.fsAddress.lat = location.lat();
        this.fsAddress.lng = location.lng();
        this.map.center = { latitude: parseFloat(location.lat()), longitude: parseFloat(location.lng()) };

        this.marker.coords.latitude = location.lat();
        this.marker.coords.longitude = location.lng();

        if (this.agmMap) {
          this.agmMap.triggerResize();
        }

      } else {
        this.fsAddress.lat = null;
        this.fsAddress.lng = null;
      }
    });
    this.onChange.emit(this.fsAddress);
  }

  ngOnDestroy() {
    if (this.agmMap) {
      this.mapReady$.unsubscribe();
    }
  }
}


@Component({
  selector: 'fs-address-format',
  template: `
  <ng-template ngFor let-key [ngForOf]="fsOptions | keys">
    <span class="{{ key }}" *ngIf="fsAddress[fsOptions[key]['name']]">{{ fsAddress[fsOptions[key]['name']] }}</span>
  </ng-template>`,
  styles: [
  `span::after { content: ", "; }`,
  `span:last-child:after { content: ""; }`
  ],
})
export class FsAddressFormatComponent implements OnInit {

  @Input() fsAddress = {};
  @Input() fsOptions = {};

  constructor(private fsUtil: FsUtil) {}

  ngOnInit() {
    this.fsUtil.each(['address', 'address2', 'city', 'region', 'country', 'zip'], item => {
      if (!this.fsUtil.isObject(this.fsOptions[item])) {
        this.fsOptions[item] = {};
      }

      if (!this.fsOptions[item].name) {
        this.fsOptions[item].name = item;
      }
    });
  }
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}
