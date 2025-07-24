import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { guid } from '@firestitch/common';
import { controlContainerFactory } from '@firestitch/core';
import { FsMapComponent } from '@firestitch/map';

import { Subject } from 'rxjs';

import { isObject } from 'lodash-es';

import { Countries } from '../../consts/countries.const';
import { Country } from '../../enums/country.enum';
import { FsAddressConfig } from '../../interfaces/address-config.interface';
import { FsAddressMapConfig } from '../../interfaces/address-map-config.interface';
import { FsAddress } from '../../interfaces/address.interface';
import { FsAddressRegionComponent } from '../address-region/address-region.component';


@Component({
  selector: 'fs-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(FsAddressRegionComponent)
  public fsAddressRegionComponent: FsAddressRegionComponent;

  @ViewChild(FsMapComponent)
  public map: FsMapComponent;

  @Input() public address: FsAddress;
  @Input() public excludeCountries: string[];
  @Input() public regionCountryOrder = [Country.Canada, Country.UnitedStates];

  @Input('config') public set setConfig(config: FsAddressConfig) {
    config.search = config.search === undefined ? false : config.search;

    if (!isObject(config.map)) {
      config.map = { showMap: false };
    }

    this.config = config;
  }

  @Output() public addressChange = new EventEmitter();
  @Output() public collapseChange = new EventEmitter();

  public controlNames = {
    street: `street_${guid('xxxxxxxx')}`,
    locationName: `location_name_${guid('xxxxxxxx')}`,
    address2: `address2_${guid('xxxxxxxx')}`,
    address3: `address3_${guid('xxxxxxxx')}`,
    city: `city_${guid('xxxxxxxx')}`,
    addressCountry: `address_country_${guid('xxxxxxxx')}`,
    zip: `zip_${guid('xxxxxxxx')}`,
    lat: `lat_${guid('xxxxxxxx')}`,
    lng: `lng_${guid('xxxxxxxx')}`,
  };

  public config: FsAddressConfig = {};
  public countries = Countries;
  public zipLabel: string;
  public searchedAddress: string;
  public isSearched = false;
  public mapConfig: FsAddressMapConfig;

  private _destory$ = new Subject();

  public ngOnInit() {
    this._initAddress();
    this._initConfig();
    this._initMap();

    this._initCountries();
    this._initZipAndStateLabels();
    this._initCollapseBtn();
  }

  public get regionCountries() {
    return this.countries.map((country) => country.code);
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
          this._initZipAndStateLabels();
        }
      }
    }
  }

  public ngOnDestroy() {
    this._destory$.next(null);
    this._destory$.complete();
  }

  public recenter() {
    this.mapConfig.center = { latitude: this.address.lat, longitude: this.address.lng };
    this.mapConfig.marker.coords.latitude = this.address.lat;
    this.mapConfig.marker.coords.longitude = this.address.lng;
    this.map.setCenter(this.address.lat, this.address.lng);
  }

  public dragEnded(event): void {
    this.mapConfig.marker.events.dragend(event);
  }

  public changeCountry() {

    const country = this.countries.find((item) => item.code === this.address.country);

    if (country && country.regions) {

      const region = country.regions.some((item) => item.code === this.address.region);

      if (!region) {
        this.address.region = null;
      }

    } else {
      this.address.region = null;
    }

    this.fsAddressRegionComponent.region = this.address.region;
    this._initZipAndStateLabels();
    this.change();
  }

  public changeRegion() {
    if (this.address.region) {
      const regionCountry = this.countries.find((country) => {
        return country.regions
          && country.regions.find((region) => this.address.region === region.code);
      });

      if (regionCountry) {
        this.address.country = regionCountry.code;
      }
    }

    this.change();
  }

  public change(event?) {
    if (event) {
      event.stopPropagation();
    }

    if (!this.config.search) {
      return this.addressChange.emit(this.address);
    }

    const geocoder = new google.maps.Geocoder();
    const parts = [
      this.address.country,
      this.address.region,
      this.address.city,
      this.address.zip,
      this.address.street,
      this.address.name,
    ];

    this.searchedAddress = parts.filter((part) => part).join(', ');

    this.addressChange.emit(this.address);

    geocoder.geocode({ address: this.searchedAddress }, (results, status) => {
      this.isSearched = true;
      const newAddress = { ...this.address };

      if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
        const location = results[0].geometry.location;

        newAddress.description = results[0].formatted_address;
        newAddress.lat = location.lat();
        newAddress.lng = location.lng();

        this.mapConfig.center = { latitude: location.lat(), longitude: location.lng() };

        this.mapConfig.marker.coords.latitude = location.lat();
        this.mapConfig.marker.coords.longitude = location.lng();
      } else {
        newAddress.lat = null;
        newAddress.lng = null;
      }

      this.addressChange.emit(newAddress);
    });
  }

  private _initAddress() {
    this.address = {
      name: null,
      country: null,
      region: null,
      address2: null,
      address3: null,
      street: null,
      city: null,
      zip: null,
      lat: null,
      lng: null, ...this.address,
    };
  }

  private _initConfig() {
    this.config = {
      name: { required: false, visible: true },
      country: { required: false, visible: true },
      region: { required: false, visible: true },
      address2: { required: false, visible: false },
      address3: { required: false, visible: false },
      city: { required: false, visible: true },
      street: { required: false, visible: true },
      zip: { required: false, visible: true }, 
      lat: { required: false, visible: false },
      lng: { required: false, visible: false },
      ...this.config,
    };
  }

  private _initMap() {
    this.mapConfig = {
      center: {
        latitude: this.address.lat || 9999,
        longitude: this.address.lng || 9999,
      },
      zoom: 13,
      scrollwheel: false,
      streetViewControl: false,
      zoomControl: true,
      mapTypeControlOptions: { mapTypeIds: [] },
      marker: {
        id: 0,
        coords: { latitude: this.address.lat, longitude: this.address.lng },
        options: { draggable: true },
        events: {
          dragend: (marker) => {
            this.address.lat = marker.coords.lat;
            this.address.lng = marker.coords.lng;
            this.addressChange.emit(this.address);
          },
        },
      }, ...this.config.map,
    };
  }

  private _initCountries() {
    if (this.config.country && this.config.country.list && this.config.country.list.length) {
      this.countries.length = 0;
      this.config.country.list.forEach((el) => {
        const country = this.countries.find((countryEl) => countryEl.code === el);
        if (country) {
          this.countries.push(country);
        }
      });
    }
  }

  private _initZipAndStateLabels() {
    this._updateCountryRegionLabels();
  }

  private _updateCountryRegionLabels() {
    if (this.address.country) {
      this.zipLabel = this.address.country === String(Country.UnitedStates)
        ? 'ZIP Code'
        : 'Postal Code';
    } else {
      this.zipLabel = 'ZIP/Postal Code';
    }

    this.zipLabel = this.config.zip.placeholder
      ? this.config.zip.placeholder
      : this.zipLabel;
  }

  private _initCollapseBtn() {
    this.config.collapseButton = {
      show: true,
      title: 'Collapse Address Editor',
      color: 'primary',
      theme: 'mat-raised-button', ...this.config.collapseButton,
    };
  }
}
