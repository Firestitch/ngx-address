import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  Optional,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { controlContainerFactory } from '@firestitch/core';

import { AgmMap, AgmMarker } from '@agm/core';

import { Subject } from 'rxjs';
import { isObject } from 'lodash-es';

import { Countries } from '../../consts/countries.const';

import { FsAddress } from '../../interfaces/address.interface';
import { FsAddressConfig } from '../../interfaces/address-config.interface';
import { FsAddressRegionComponent } from '../address-region/address-region.component';
import { takeUntil } from 'rxjs/operators';
import { FsAddressMapConfig } from '../../interfaces/address-map-config.interface';
import { Country } from '../../enums/country.enum';

declare var google: any;


@Component({
  selector: 'fs-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(AgmMap) agmMap;
  @ViewChild(AgmMarker) agmMarker;
  @ViewChild(FsAddressRegionComponent) fsAddressRegionComponent;

  @Input() address: FsAddress;
  @Input() excludeCountries: string[];
  @Output() addressChange = new EventEmitter();
  @Output() collapseChange = new EventEmitter();

  @Input()
  public regionCountryOrder = ['CA', 'US'];

  @Input()
  public suggestions = false;

  @Input('config') set setConfig(config: FsAddressConfig) {

    config.search = config.search === undefined ? false : config.search;

    if (!isObject(config.map)) {
      config.map = { showMap: false };
    }

    this.config = config;
  }

  public config: FsAddressConfig = {};
  public countries = Countries;
  public zipLabel: string;
  public searchedAddress: string;
  public isSearched = false;
  public mapConfig: FsAddressMapConfig;

  private _destory$ = new Subject();

  public ngOnInit() {
    this.initAddress();
    this.initConfig();
    this.initMap();

    this.initCountries();
    this.initZipAndStateLabels();
    this.initCollapseBtn();

    // Example ready event. Allow to use google object and map instance
    if (this.agmMap) {
      this.agmMap
        .mapReady
        .pipe(
          takeUntil(this._destory$)
        )
        .subscribe(() => {

          this.agmMap.triggerResize();

          if (this.address.name ||
            this.address.country ||
            this.address.region ||
            this.address.city ||
            this.address.zip) {
              this.address.lat = 9999;
              this.address.lng = 9999;
              this.change();
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
    this._destory$.next();
    this._destory$.complete();
  }

  public recenter() {
    this.mapConfig.center = { latitude: this.address.lat, longitude: this.address.lng };
    this.mapConfig.marker.coords.latitude = this.address.lat;
    this.mapConfig.marker.coords.longitude = this.address.lng;
    this.agmMap.triggerResize()
      .then(() => this.agmMap._mapsWrapper.setCenter({lat: this.address.lat, lng: this.address.lng}));
  }

  public dragEnded(event): void {
    this.mapConfig.marker.events.dragend(event)
  }

  public changeCountry() {

    const country = this.countries.find(item => item.code === this.address.country);

    if (country && country.regions) {

      const region = country.regions.some(item => item.code === this.address.region);

      if (!region) {
        this.address.region = null;
      }

    } else {
      this.address.region = null;
    }

    this.fsAddressRegionComponent.region = this.address.region;
    this.initZipAndStateLabels();
    this.change();
  }

  public changeRegion() {
    if (!!this.address.region) {
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
      this.address.name
    ];

    this.searchedAddress = parts.filter(part => part).join(', ');

    this.addressChange.emit(this.address);

    geocoder.geocode( { address: this.searchedAddress  }, (results, status) => {
      this.isSearched = true;
      const newAddress = Object.assign({}, this.address);

      if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        const location = results[0].geometry.location;

        newAddress.description = results[0].formatted_address;
        newAddress.lat = location.lat();
        newAddress.lng = location.lng();

        this.mapConfig.center = { latitude: location.lat(), longitude: location.lng() };

        this.mapConfig.marker.coords.latitude = location.lat();
        this.mapConfig.marker.coords.longitude = location.lng();

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

  private initAddress() {
    this.address = Object.assign({
      name: void 0,
      country: void 0,
      region: void 0,
      address2: void 0,
      address3: void 0,
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
      address2: { required: false, visible: false },
      address3: { required: false, visible: false },
      city: { required: false, visible: true },
      street: { required: false, visible: true },
      zip: { required: false, visible: true },
    }, this.config);
  }

  private initMap() {

    this.mapConfig = Object.assign({
      center: {
        latitude: this.address.lat || 9999,
        longitude: this.address.lng || 9999
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
          dragend: marker => {
            this.address.lat = marker.coords.lat;
            this.address.lng = marker.coords.lng;
            this.addressChange.emit(this.address);
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
    Object.keys(this.address).forEach((objectKey) => {
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
    if (this.address.country) {
      this.zipLabel = this.address.country === Country.UnitedStates
        ? 'ZIP Code'
        : 'Postal Code';
    } else {
      this.zipLabel = 'ZIP/Postal Code';
    }
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
