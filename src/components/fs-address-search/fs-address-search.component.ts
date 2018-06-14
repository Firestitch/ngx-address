import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import 'rxjs/add/operator/debounceTime';
import { Subject } from 'rxjs/Subject';

import {
  FsAddress,
  IFsAddressConfig
} from '../../interfaces';
import { MatAutocompleteTrigger } from '@angular/material';
import {
  each
} from 'lodash';

@Component({
  selector: 'fs-address-search',
  templateUrl: './fs-address-search.component.html',
  styleUrls: ['./fs-address-search.component.scss'],
})
export class FsAddressSearchComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {


  @Input() address: FsAddress = {};
  @Input() showEdit = false;
  @Input() showClear = true;
  @Input() format = 'online';
  @Input() config: IFsAddressConfig = {};
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();
  @Output() cleared: EventEmitter<any> = new EventEmitter<any>();
  @Output() edited: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('search') searchElement: ElementRef;
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  public predictions: any[] = [];
  public googleAutocompleteService = null;
  public googlePlacesService = null;
  public location = '';
  public isRequired = false;
  public emptyAddress = true;
  private changeAddressDebounce = new Subject<any>();
  private allowDefaultBlurAddress = true;
  private dirty = false;

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone
  ) {
    this.changeAddressDebounce
      .debounceTime(300)
      .subscribe(value => {
        this.allowDefaultBlurAddress = !!value;
        this.updatePredictions(value);
      });
  }

  public ngOnChanges(changes) {
    if (changes.address) {
      this.generateFullAddress();
    }
  }

  public ngOnInit() {
    this.initConfig();
    this.initAddress();
    this.initGoogleMap();
  }

  public ngAfterViewInit() {
    // TODO should be changed to simple (closed) after updating to the latest Angular and Material
    // this.trigger.panelClosingActions.subscribe(e => {
    //   if (this.allowDefaultBlurAddress && this.predictions.length) {
    //     this.selectionChange(this.predictions[0].description);
    //   }
    // });
  }

  public ngOnDestroy() {}

  private initConfig() {
    this.config = Object.assign({
      name: { required: false, visible: true },
      country: { required: false, visible: true },
      region: { required: false, visible: true },
      city: { required: false, visible: true },
      street: { required: false, visible: true },
      zip: { required: false, visible: true },
      lat: { required: false },
      lng: { required: false },
    }, this.config);

    this.isRequired = (this.config.name.required ||
      this.config.country.required ||
      this.config.region.required ||
      this.config.city.required ||
      this.config.street.required ||
      this.config.zip.required);
  }

  private initAddress() {
    this.generateFullAddress();
  }

  private generateFullAddress() {
    this.emptyAddress = !(this.address.name) && !(this.address.street) &&
                        !(this.address.city) && !(this.address.region) &&
                        !(this.address.zip) && !(this.address.country);

    this.location = (this.address.name ? this.address.name + ', ' : '') +
      (this.address.street ? this.address.street + ', ' : '') +
      (this.address.city ? this.address.city + ', ' : '') +
      (this.address.region ? this.address.region + ', ' : '') +
      (this.address.zip ? this.address.zip + ', ' : '') +
      (this.address.country ? this.address.country : '');
  }

  private initGoogleMap() {
    this._mapsAPILoader
      .load()
      .then(() => {
        this.googleAutocompleteService = new google.maps.places.AutocompleteService();
        this.googlePlacesService = new google.maps.places.PlacesService(this.searchElement.nativeElement);

        if (this.location) {
          this.updatePredictions(this.location);
        }
      });
  }

  public autocompleteFormat(value) {
    if (typeof value === 'string') {
      return value;
    }
    return value ? value.description : '';
  }

  private updatePredictions(value) {
    if (value && this.googleAutocompleteService) {

      this.googleAutocompleteService.getPlacePredictions(
        {input: value},
        (predictions, status) => {
          this._ngZone.run(() => {
            this.predictions.length = 0;

            if (status != google.maps.places.PlacesServiceStatus.OK) {
              return;
            }
            this.predictions = predictions.slice();

            this.predictions.push({description: `Just use "${value}"`, id: 1, value: value});
          });
        });
    }
  }

  public addressChanged(event) {
    this.changeAddressDebounce.next(event);
  }

  public selectionChange(option) {

    this.allowDefaultBlurAddress = false;
    const place = option.value;

    const newAddress: FsAddress = {};

    this.emptyAddress = true;

    if (place && this.googlePlacesService) {

      newAddress.description = place.description;

      this.googlePlacesService.getDetails(
        place,
        (result, status) => {
          this._ngZone.run(() => {

            if (status != google.maps.places.PlacesServiceStatus.OK) {
              return;
            }

            newAddress.lat = result.geometry.location.lat();
            newAddress.lng = result.geometry.location.lng();

            let countryLongName, regionLongName, streetShortName;

            // Finding different parts of address
            result.address_components.forEach((item) => {
              if (item.types.some(type => type === 'country')) {
                newAddress.country = item.short_name;
                countryLongName = item.long_name;
              }

              if (item.types.some(type => type === 'administrative_area_level_1')) {
                newAddress.region = item.short_name;
                regionLongName = item.long_name;
              }

              if (item.types.some(type => type === 'locality')) {
                newAddress.city = item.long_name;
              }

              if (item.types.some(type => type === 'postal_code')) {
                newAddress.zip = item.long_name;
              }
            });

            // Address.Street consists from number and street
            const streetNumber = result.address_components
              .find(el => el.types.some(type => type === 'street_number'));

            if (streetNumber) {
              newAddress.street = streetNumber.long_name + ' ';
              streetShortName = streetNumber.long_name + ' ';
            } else {
              const match = newAddress.description.match(/^[\d-]+/);
              if (match) {
                newAddress.street = match[0] + ' ';
                streetShortName = match[0] + ' ';
              }
            }

            const streetAddress = result.address_components
              .find(el => el.types.some(type => type === 'route'));

            if (streetAddress) {
              if (!newAddress.street) {
                newAddress.street = streetAddress.long_name;
                streetShortName = streetAddress.short_name;
              } else {
                newAddress.street += streetAddress.long_name;
                streetShortName += streetAddress.short_name;
              }
            }

            // Checking correct place NAME
            if (newAddress.country !== result.name &&
                countryLongName !== result.name &&
                newAddress.region !== result.name &&
                regionLongName !== result.name &&
                newAddress.city !== result.name &&
                streetShortName !== result.name &&
                streetAddress && streetAddress.short_name !== result.name &&
                streetAddress && streetAddress.long_name !== result.name &&
                newAddress.zip !== result.name &&
                newAddress.street !== result.name) {
              newAddress.name = result.name;
            } else {
              newAddress.name = '';
            }

            this.address = newAddress;

            this.generateFullAddress();
            this.changed.emit(newAddress);
            this.allowDefaultBlurAddress = true;
          });
        });
    }
  }

  public functionPromise = (() => {

    return new Promise((resolve, reject) => {

      setTimeout(() => {

        const requiredField = [];
        const parts = ['name', 'street', 'city', 'region', 'zip', 'country'];

        each(parts, (part) => {
          if (this.config[part].required && (this.address[part] === '' || !this.address[part])) {
            requiredField.push([part]);
          }
        });

        if ((this.config.lat.required || this.config.lng.required) && (!this.address.lat || !this.address.lat)) {
          requiredField.push('position on map');
        }

        if (requiredField.length) {
          if (requiredField.length === 1) {
            reject(`The ${requiredField[0]} is required`);
          } else {
            const last = requiredField.pop();
            reject(`The ${requiredField.join(', ')} and ${last} are required`);
          }
        } else {
          resolve();
        }
      }, 300);
    });
  }).bind(this);

  public clear() {
    this.address = {};
    this.location = null;
    this.generateFullAddress();
    this.allowDefaultBlurAddress = false;
    this.cleared.emit(this.address);
    this.changed.emit(this.address);
  }

  public edit() {
    this.edited.emit();
  }
}
