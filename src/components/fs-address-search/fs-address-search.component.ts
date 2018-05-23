import {
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

import { FsAddress } from '../../interfaces/address.interface';
import { IFsAddressConfig } from '../../interfaces/address-config.interface';


@Component({
  selector: 'fs-address-search',
  templateUrl: './fs-address-search.component.html',
  styleUrls: ['./fs-address-search.component.scss'],
})
export class FsAddressSearchComponent implements OnChanges, OnInit, OnDestroy {

  @Input() address: FsAddress = {};
  @Input() config: IFsAddressConfig = {};
  @Input() pickerMode = false;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  public isEdit: boolean;
  @Input() get editMode() {
    return this.isEdit;
  }
  @Output() editModeChange = new EventEmitter();
  set editMode(value: boolean) {
    this.isEdit = value;
    this.editModeChange.emit(this.isEdit);
  }

  // Address Predictions
  public predictions: any[] = [];

  @ViewChild('search')
  public searchElement: ElementRef;

  // Google
  public googleAutocompleteService = null;
  public googlePlacesService = null;

  // Other
  public addressFullName: string[] = [];
  public addressFullNameString = '';
  public mainAddressPart: string;
  public isRequired = false;
  private _changeAddressDebounce = new Subject<any>();

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone
  ) {
    this._changeAddressDebounce
      .debounceTime(300)
      .subscribe(value => {
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

  public ngOnDestroy() {}

  private initConfig() {
    this.config = Object.assign({
      name: { required: false, visible: true },
      country: { required: false, visible: true },
      region: { required: false, visible: true },
      city: { required: false, visible: true },
      street: { required: false, visible: true },
      zip: { required: false, visible: true },
    }, this.config);

    this.isRequired = (this.config.name.required ||
      this.config.country.required ||
      this.config.region.required ||
      this.config.city.required ||
      this.config.street.required ||
      this.config.zip.required);
  }

  private initAddress() {
    this.address = Object.assign({
      name: void 0,
      country: void 0,
      region: void 0,
      city: void 0,
      street: void 0,
      zip: void 0,
      lat: null,
      lng: null
    }, this.address);

    this.generateFullAddress();
  }

  private generateFullAddress() {
    this.addressFullName = [];
    if (this.address.name) {
      this.addressFullName.push(this.address.name);
    }

    if (this.address.street) {
      this.addressFullName.push(this.address.street);
    }

    if (this.address.city) {
      this.addressFullName.push(this.address.city);
    }

    if (this.address.region) {
      this.addressFullName.push(this.address.region);
    }

    if (this.address.zip) {
      this.addressFullName.push(this.address.zip);
    }

    if (this.address.country) {
      this.addressFullName.push(this.address.country);
    }

    this.mainAddressPart = this.addressFullName.shift();

    this.addressFullNameString = '';
    if (this.mainAddressPart && this.mainAddressPart !== '') {
      this.addressFullNameString += this.mainAddressPart + ', ';
    }
    this.addressFullNameString += this.addressFullName.join(', ');
  }

  private initGoogleMap() {
    this._mapsAPILoader
      .load()
      .then(() => {
        this.googleAutocompleteService = new google.maps.places.AutocompleteService();
        this.googlePlacesService = new google.maps.places.PlacesService(this.searchElement.nativeElement);

        if (this.address && this.address.description) {
          this.updatePredictions(this.address.description);
        }
      });
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

            this.predictions = [{description: `Just use "${value}"`, id: 1, value: value}].concat(predictions);
          });
        });

    }
  }

  public addressChanged(event) {
    this._changeAddressDebounce.next(event);
  }

  public change(event) {
    event.stopPropagation();
  }

  public selectionChange(event) {
    const place = this.predictions.find(el => el.description === event.option.value);

    if (place.id === 1) {
      this.address = {
        name: place.value,
      };

      this.generateFullAddress();

      this.selected.emit({
        name: place.value,
        description: place.value
      });

      return;
    }

    const newAddress: FsAddress = {
      description: place.description
    };

    if (place && this.googlePlacesService) {
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

            if (newAddress.country !== result.name &&
                countryLongName !== result.name &&
                newAddress.region !== result.name &&
                regionLongName !== result.name &&
                newAddress.city !== result.name &&
                streetShortName !== result.name &&
                newAddress.zip !== result.name &&
                newAddress.street !== result.name) {
              newAddress.name = result.name;
            } else {
              newAddress.name = '';
            }
            this.address = newAddress;

            this.generateFullAddress();

            this.selected.emit(newAddress);
          });
        });
    }
  }

  public functionPromise() {
    const requiredField = [];
    if (this.config.name.required && (this.address.name === '' || !this.address.name)) {
      requiredField.push('name');
    }

    if (this.config.country.required && (this.address.country === '' || !this.address.country)) {
      requiredField.push('country');
    }

    if (this.config.region.required && (this.address.region === '' || !this.address.region)) {
      requiredField.push('region');
    }

    if (this.config.city.required && (this.address.city === '' || !this.address.city)) {
      requiredField.push('city');
    }

    if (this.config.street.required && (this.address.street === '' || !this.address.street)) {
      requiredField.push('street');
    }

    if (this.config.zip.required && (this.address.zip === '' || !this.address.zip)) {
      requiredField.push('zip');
    }

    return (formControl) => {
      return new Promise((resolve, reject) => {
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
      });
    };
  }

  public clear() {
    this.editMode = false;
    this.address = {};
    this.generateFullAddress();
  }

  public edit() {
    this.editMode = true;
  }
}
