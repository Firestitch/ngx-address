import {
  Component,
  Output,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  EventEmitter,
  OnChanges,
  Inject
} from '@angular/core';
import { NgForm, ControlContainer} from '@angular/forms';

import { AgmMap, AgmMarker } from '@agm/core';

import { Subscription } from 'rxjs';
import { filter } from 'lodash-es';

import { COUNTRIES } from './../../constants/inject-token-countries';

import { FsAddress } from '../../interfaces/address.interface';
import { IFsAddressConfig } from '../../interfaces/address-config.interface';

declare var google: any;


@Component({
  selector: 'fs-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FsAddressComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(AgmMap) agmMap;
  @ViewChild(AgmMarker) agmMarker;

  // ADDRESS Two-way binding
  @Input() address: FsAddress;
  @Output() addressChange = new EventEmitter();
  @Input() config: IFsAddressConfig = {};

  @Output() collapseChange = new EventEmitter();

  public isSearched = false;
  private _subMapReady: Subscription;

  public countries = [];

  // Others
  public zipLabel: string;
  public searchedAddress: string;

  constructor(@Inject(COUNTRIES) countries) {
    this.countries = countries;
  }

  public ngOnInit() {
    this.initAddress();
    this.initConfig();
    this.initMap();

    this.initCountries();
    this.initZipAndStateLabels();
    this.initCollapseBtn();

    // Example ready event. Allow to use google object and map instance
    if (this.agmMap) {
      this._subMapReady = this.agmMap
        .mapReady
        .subscribe(() => {

          this.agmMap.triggerResize();

          if (this.address.name ||
            this.address.country ||
            this.address.region ||
            this.address.city ||
            this.address.zip) {
              this.address.lat = 9999;
              this.address.lng = 9999;
              this.search();
          }
        });
      }
  }

  public ngOnChanges(change) {

    if (change.address) {
      if (!change.address.currentValue) {
        this.address = {};
      }

      if (!change.address.firstChange) {
        const currentCountry = change.address.currentValue ? change.address.currentValue.country : null;
        const previousCountry = change.address.previousValue ? change.address.previousValue.country : null;
        if (currentCountry !== previousCountry) {
          this.initZipAndStateLabels();
        }
      }
    }
  }

  public ngOnDestroy() {
    if (this.agmMap) {
      this._subMapReady && this._subMapReady.unsubscribe();
    }
  }

  public recenter() {
    this.config.map.center = { latitude: this.address.lat, longitude: this.address.lng };
    this.config.map.marker.coords.latitude = this.address.lat;
    this.config.map.marker.coords.longitude = this.address.lng;
    this.agmMap.triggerResize()
      .then(() => this.agmMap._mapsWrapper.setCenter({lat: this.address.lat, lng: this.address.lng}));
  }

  public changeCountry() {
    this.updateCountryRegionLabels();
    this.search();
  }


  public search(event?) {
    if (event) {
      event.stopPropagation();
    }

    const geocoder = new google.maps.Geocoder();
    const parts = [
      this.address.country,
      this.address.region,
      this.address.city,
      this.address.zip,
      this.address.street,
      this.address.name
    ];

    this.searchedAddress = parts.filter(part => part).join(', ');

    geocoder.geocode( { address: this.searchedAddress  }, (results, status) => {
      this.isSearched = true;
      const newAddress = Object.assign({}, this.address);

      if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        const location = results[0].geometry.location;

        newAddress.description = results[0].formatted_address;
        newAddress.lat = location.lat();
        newAddress.lng = location.lng();
        this.config.map.center = { latitude: location.lat(), longitude: location.lng() };

        this.config.map.marker.coords.latitude = location.lat();
        this.config.map.marker.coords.longitude = location.lng();

        if (this.agmMap) {
          this.agmMap.triggerResize();
        }
      } else {
        newAddress.lat = null;
        newAddress.lng = null;
      }

      this.addressChange.emit(newAddress);
    });
  }

  public collapseEditor() {
    this.collapseChange.emit();
  }

  private initAddress() {
    this.address = Object.assign({
      name: void 0,
      country: void 0,
      region: void 0,
      street: void 0,
      city: void 0,
      zip: void 0,
      lat: null,
      lng: null,
    }, this.address);
  }

  private initConfig() {
    this.config = Object.assign({
      name: { required: false, visible: true },
      country: { required: false, visible: true },
      region: { required: false, visible: true },
      city: { required: false, visible: true },
      street: { required: false, visible: true },
      zip: { required: false, visible: true },
    }, this.config);
  }

  private initMap() {
    this.config.map = Object.assign({
      showMap: true,
      center: {
        latitude: this.address.lat || 9999,
        longitude: this.address.lng || 9999
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
      }, this.config.map);
  }

  private initCountries() {
    if (this.config.country && this.config.country.list && this.config.country.list.length) {
      this.countries.length = 0;
      this.config.country.list.forEach(el => {
        const country = this.countries.find(countryEl => countryEl.code === el);
        if (country) {
          this.countries.push(country);
        }
      });
    }

    let isEmpty = true;
    Object.keys(this.address).forEach((objectKey, index) => {
      if (this.address[objectKey]) {
        isEmpty = false;
        return;
      }
    });
  }

  private initZipAndStateLabels() {
    this.updateCountryRegionLabels();
  }

  private updateCountryRegionLabels() {
    this.zipLabel = (this.address.country === 'CA' || this.address.country === 'US' ) ? 'Zip' : 'Postal Code';
  }

  private initCollapseBtn() {
    this.config.collapseButton = Object.assign({
      show: true,
      title: 'Collapse Address Editor',
      color: 'primary',
      theme: 'mat-raised-button',
    }, this.config.collapseButton);
  }
}
