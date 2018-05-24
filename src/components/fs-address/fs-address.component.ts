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
import { IFsAddressMapConfig } from '../../interfaces/address-map-config.interface';


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
  @Output() change = new EventEmitter<any>();

  public isSearched = false;
  private _subMapReady: Subscription;

  public countries = COUNTRIES.slice() || [];
  public regions: { code: string, name: string }[] = [];

  // Others
  public regionLabel: string;
  public zipLabel: string;
  public searchedAddress: string;

  constructor() { }

  public ngOnInit() {
    this.initAddress();
    this.initConfig();
    this.initMap();

    this.initCountries();
    this.initRegions();
    this.initZipAndStateLabels();

    // Example ready event. Allow to use google object and map instance
    if (this.agmMap) {
      this._subMapReady = this.agmMap
        .mapReady
        .subscribe((map) => {

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

  public ngOnDestroy() {
    if (this.agmMap) {
      this._subMapReady.unsubscribe();
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
    const country = filter(COUNTRIES, { code: this.address.country })[0];
    this.regions = country  && country.regions ? country.regions : [];
    this.updateCountryRegionLabels();
    this.search();
  }

  public changeRegion() {
    const country = filter(COUNTRIES, { code: this.address.country })[0];

    if (country && country.regions) {
      const region = filter(country.regions, { code: this.address.region })[0];
      this.address.region = region.code;
    }

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

      if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        const location = results[0].geometry.location;
        this.address.description = results[0].formatted_address;
        this.address.lat = location.lat();
        this.address.lng = location.lng();
        this.config.map.center = { latitude: location.lat(), longitude: location.lng() };

        this.config.map.marker.coords.latitude = location.lat();
        this.config.map.marker.coords.longitude = location.lng();

        if (this.agmMap) {
          this.agmMap.triggerResize();
        }
      } else {
        this.address.lat = null;
        this.address.lng = null;
      }

      this.change.emit(this.address);
    });
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
        const country = COUNTRIES.find(countryEl => countryEl.code === el);
        if (country) {
          this.countries.push(country);
        }
      });
    }

    if (this.countries.length && !this.address.country) {
      this.address.country = this.countries[0].code
    }
  }

  private initRegions() {
    if (this.address.country && this.address.country) {
      const country = COUNTRIES.find(countryEl => countryEl.code === this.address.country);

      if (country) {
        this.regions = country['regions'] || [];
      }
    }
  }

  private initZipAndStateLabels() {
    this.updateCountryRegionLabels();
  }

  private updateCountryRegionLabels() {
    this.zipLabel = (this.address.country === 'CA' || this.address.country === 'US' ) ? 'Zip' : 'Postal Code';
    this.regionLabel = this.address.country === 'CA' ? 'Province' : 'State';
  }
}
