import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
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
import { NgForm, ControlContainer } from '@angular/forms';

import { each } from 'lodash';
import { ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'fs-address-search',
  templateUrl: './fs-address-search.component.html',
  styleUrls: ['./fs-address-search.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FsAddressSearchComponent implements OnChanges, OnInit {

  @Input() format = 'online';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() config: IFsAddressConfig = {};
  @Input() name = true;
  @Output() cleared: EventEmitter<any> = new EventEmitter<any>();
  @Output() edited: EventEmitter<any> = new EventEmitter<any>();
  @Input() get address() {
    return this._address;
  }
  @Output() addressChange = new EventEmitter();
  set address(address: FsAddress) {
    this._address = address;
    this.calculateAddress();
    this.showEdit = !this.emptyAddress;
    this.showClear = !this.emptyAddress;
    this.addressChange.emit(this._address);
  }
  @ViewChild('search') searchElement: ElementRef;
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;
  @ViewChild('search', { read: MatAutocompleteTrigger }) autoComplete: MatAutocompleteTrigger;

  public _address: FsAddress = {};
  public showEdit = false;
  public showClear = false;
  public predictions: any[] = [];
  public selecting = false;
  public googleAutocompleteService = null;
  public googlePlacesService = null;
  public location = '';
  public isRequired = false;
  public emptyAddress = true;
  private changeAddressDebounce = new Subject<any>();

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone
  ) {
    this.changeAddressDebounce
      .debounceTime(300)
      .subscribe(value => {
        this.updatePredictions(value);
      });
  }

  public ngOnChanges(changes) {
    if (changes.address) {
      this.calculateAddress();
    }
  }

  public ngOnInit() {
    this.initConfig();
    this.calculateAddress();
    this.initGoogleMap();
  }

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

    this.isRequired =
    ( this.config.name.required ||
      this.config.country.required ||
      this.config.region.required ||
      this.config.city.required ||
      this.config.street.required ||
      this.config.zip.required);
  }

  private calculateAddress() {
    this.emptyAddress = !(this._address.name) && !(this._address.street) &&
                        !(this._address.city) && !(this._address.region) &&
                        !(this._address.zip) && !(this._address.country);
  }

  private initGoogleMap() {
    this._mapsAPILoader
      .load()
      .then(() => {
        this.googleAutocompleteService = new google.maps.places.AutocompleteService();
        this.googlePlacesService = new google.maps.places.PlacesService(this.searchElement.nativeElement);
      });
  }

  public autocompleteFormat = ((value) => {

    if (value) {
      return value.description
    } else if (!this.emptyAddress) {
      return ' ';
    }

  }).bind(this);

  private updatePredictions(value) {
    if (value && this.googleAutocompleteService) {

      this.googleAutocompleteService.getPlacePredictions(
        {input: value},
        (predictions, status) => {
          this._ngZone.run(() => {
            this.predictions.length = 0;
            if (status != google.maps.places.PlacesServiceStatus.OK &&
                status != google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              return;
            }

            this.predictions = predictions ? predictions.slice() : [];

            this.predictions.push({ description: `Just use "${value}"`, id: 1, name: value });
          });
        });
    }
  }

  public blur() {
    this.selecting = true;
  }

  public addressChanged(event) {
    if (event.keyCode === ENTER) { return; }

    this.changeAddressDebounce.next(event.currentTarget.value);
    this.autoComplete.openPanel();
  }

  public autocompleteSelected(option) {

    const place = option.value;

    const newAddress: FsAddress = {};
    this.emptyAddress = true;

    (new Promise((resolve) => {

      // when something went wrong
      if (!place || !this.googlePlacesService) {
        resolve();
      }

      // when it's not an address it's "Just use" case
      if (place && !place.place_id) {
        this.addressChange.emit(place);
        resolve();
      }

      newAddress.description = place.description;
      this.googlePlacesService.getDetails(place, (result, status) => {
        this._ngZone.run(() => {

          if (status != google.maps.places.PlacesServiceStatus.OK) {
            return resolve();
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

          resolve();
          this.addressChange.emit(newAddress);
        });
      });

    })).then(() => {
      this.selecting = false;
    });
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

        if ((this.config.lat.required || this.config.lng.required) && (!this._address.lat || !this._address.lat)) {
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
      }, 500);
    });
  }).bind(this);

  public clear() {
    this.showEdit = false;
    this.showClear = false;
    this.location = null;
    this.cleared.emit({});
    this.addressChange.emit({});
  }

  public edit() {
    this.selecting = false;
    this.edited.emit();
  }
}
