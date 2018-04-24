import {
  Component,
  Output,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  EventEmitter
} from '@angular/core';
import {
  isArrayLikeObject,
  filter,
} from 'lodash';
import {
  AgmMap,
  AgmMarker,
} from '@agm/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import { COUNTRIES } from '../../constants/countries';
import { FsAddress } from '../../interfaces';
import { IFsAddressConfig } from '../../interfaces/address-config.interface';
import { IFsAddressMapOptions } from '../../interfaces/address-map-options.interface';
declare var google: any;


@Component({
  selector: 'fs-address',
  templateUrl: './fs-address.component.html',
  styleUrls: ['./fs-address.component.scss'],
})
export class FsAddressComponent implements OnInit, OnDestroy {

  @ViewChild(AgmMap) agmMap;
  @ViewChild(AgmMarker) agmMarker;
  @Input() address: FsAddress = {};
  @Input() config: IFsAddressConfig = {};
  @Input() mapOptions: IFsAddressMapOptions = {};
  @Output() selected = new EventEmitter<any>();

  public isSearched = false;
  private _subMapReady: Subscription;

  public countries = COUNTRIES.slice();
  public states: { code: string, name: string, regions: any[] }[] = [];

  // Others
  public stateLabel: string;
  public zipLabel: string;
  public searchedAddress: string;

  constructor() { }

  public ngOnInit() {
    this.initAddress();
    this.initConfig();
    this.initMap();

    this.initCountries();
    this.initRegions();

    // Example ready event. Allow to use google object and map instance
    if (this.agmMap) {
      this._subMapReady = this.agmMap
        .mapReady
        .subscribe((map) => {

          this.agmMap.triggerResize();

          if (this.address.name ||
            this.address.country.longName ||
            this.address.state.longName ||
            this.address.city ||
            this.address.zip) {
              this.address.lat = 9999;
              this.address.lng = 9999;
              this.search();
          }
        });
      }
  }

  public recenter() {
    this.mapOptions.center = { latitude: this.address.lat, longitude: this.address.lng };
    this.mapOptions.marker.coords.latitude = this.address.lat;
    this.mapOptions.marker.coords.longitude = this.address.lng;
    this.agmMap.triggerResize()
      .then(() => this.agmMap._mapsWrapper.setCenter({lat: this.address.lat, lng: this.address.lng}));
  }

  public changeCountry() {
    const country = filter(COUNTRIES, { code: this.address.country.shortName })[0];
    this.address.country.longName = country.name;
    this.states = country ? country.regions : [];
    this.zipLabel = country && country.code == 'CA' ? 'Postal Code' : 'Zip';
    this.stateLabel = country && country.code == 'CA' ? 'Province' : 'State';
    this.search();
  }

  public changeState() {
    const country = filter(COUNTRIES, { code: this.address.country.shortName })[0];

    if (country && country.regions) {
      this.address.state.longName = filter(country.regions, { code: this.address.state.shortName })[0];
    } else {
      this.address.state.longName = this.address.state.shortName
    }
    this.search();
  }

  public search() {
    const geocoder = new google.maps.Geocoder();
    const country = filter(COUNTRIES, { code: this.address.country.shortName })[0] || {};
    const parts = [
      this.address.address,
      this.address.city,
      this.address.state.longName,
      country.name
    ];
    this.searchedAddress = parts.join(', ');

    geocoder.geocode( { address: this.searchedAddress  }, (results, status) => {
      this.isSearched = true;

      if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        const location = results[0].geometry.location;
        this.address.name = this.searchedAddress;
        this.address.lat = location.lat();
        this.address.lng = location.lng();
        this.mapOptions.center = { latitude: parseFloat(location.lat()), longitude: parseFloat(location.lng()) };

        this.mapOptions.marker.coords.latitude = location.lat();
        this.mapOptions.marker.coords.longitude = location.lng();

        if (this.agmMap) {
          this.agmMap.triggerResize();
        }

        this.selected.emit(this.address);
      } else {
        this.address.lat = null;
        this.address.lng = null;

        this.selected.emit(this.address);
      }
    });

  }

  public ngOnDestroy() {
    if (this.agmMap) {
      this._subMapReady.unsubscribe();
    }
  }

  private initAddress() {
    this.address = Object.assign({
      name: null,
      country: {},
      state: {},
      region: {},
      address: null,
      city: null,
      zip: null,
      lat: null,
      lng: null,
    }, this.address);
  }

  private initConfig() {
    this.config = Object.assign({
      country: { required: false, isVisible: true },
      state: { required: true, isVisible: true },
      city: { required: true, isVisible: true },
      address: { required: false, isVisible: true },
      zip: { required: true, isVisible: true },
    }, this.config);
  }

  private initMap() {
    this.mapOptions = Object.assign({
      showMap: true,
      center: {
        latitude: this.address.lat || null,
        longitude: this.address.lng || null
      },
      zoom: 13,
      scrollwheel: false,
      streetViewControl: false,
      zoomControl: false,
      mapTypeControlOptions: { mapTypeIds: [] },
      marker: {
        id: 0,
        coords: { latitude: this.address.lat, longitude: this.address.lng },
        options: { draggable: true },
        events: {
          dragend: marker => {
            this.address.lat = marker.coords.lat;
            this.address.lng = marker.coords.lng;
          }
        }
      }
      }, this.mapOptions);
  }

  private initCountries() {
    if (this.config.country && this.config.country.showOnly && this.config.country.showOnly.length) {
      this.countries.length = 0;
      this.config.country.showOnly.forEach(el => {
        const country = COUNTRIES.find(countryEl => countryEl.code === el);
        if (country) {
          this.countries.push(country);
        }
      });
    }
  }

  private initRegions() {
    if (this.address.country && this.address.country.shortName) {
      const country = COUNTRIES.find(countryEl => countryEl.code === this.address.country.shortName);

      if (country) {
        this.states = country['regions'] || [];
      }
    }
  }
}
