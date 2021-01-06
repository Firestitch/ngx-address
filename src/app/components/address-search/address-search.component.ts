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
  ViewChild, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { NgForm, ControlContainer } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { ENTER } from '@angular/cdk/keycodes';

import { MapsAPILoader } from '@agm/core';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { guid } from '@firestitch/common';

import { FsAddress } from '../../interfaces/address.interface';
import { IFsAddressConfig } from '../../interfaces/address-config.interface';
import { AddressFormat } from '../../enums/address-format.enum';

declare var google: any;


@Component({
  selector: 'fs-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressSearchComponent implements OnChanges, OnInit, OnDestroy {

  @Input() format = AddressFormat.TwoLine;
  @Input() disabled = false;
  @Input() readonly = false;

  @Input() public set config(value: IFsAddressConfig) {
    this._config = value;
    if (this._config) {
      this.required =
      ( (this.config.name && this.config.name.required) ||
        (this.config.country && this.config.country.required) ||
        (this.config.region && this.config.region.required) ||
        (this.config.city && this.config.city.required) ||
        (this.config.street && this.config.street.required) ||
        (this.config.address2 && this.config.address2.required) ||
        (this.config.address3 && this.config.address3.required) ||
        (this.config.zip && this.config.zip.required));
    }
  }

  public get config(): IFsAddressConfig {
    return this._config;
  }

  @Input() name = true;
  @Output() cleared: EventEmitter<any> = new EventEmitter<any>();
  @Output() edited: EventEmitter<any> = new EventEmitter<any>();
  @Input() address: FsAddress = {};
  @Output() addressChange = new EventEmitter();

  @ViewChild('searchFormField', { static: true }) public searchFormField: MatFormField = null;
  @ViewChild('searchInput', { static: true }) searchElement: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { static: true }) trigger: MatAutocompleteTrigger;
  @ViewChild('searchInput', { read: MatAutocompleteTrigger, static: true }) autoComplete: MatAutocompleteTrigger;

  public inputAddress = this._defaultInputAddress();
  public showClear = false;
  public predictions: any[] = [];
  public selecting = false;
  public googleAutocompleteService = null;
  public googlePlacesService = null;
  public location = '';
  public required = false;
  public emptyAddress = true;
  public editable = true;
  public autocompleteName = `search-${guid('xxxxxxxx')}`;

  private _changeAddressDebounce$ = new Subject<any>();
  private _destroy$ = new Subject<void>();
  private _config: IFsAddressConfig = {};

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _ngForm: NgForm,
    private _cdRef: ChangeDetectorRef,
  ) {
    this._changeAddressDebounce$
      .pipe(
        debounceTime(200),
        takeUntil(this._destroy$),
      )
      .subscribe(value => {
        this.updatePredictions(value);
      });
  }

  public revalidate() {
    const control = this._ngForm.controls[this.autocompleteName];
    control.markAsDirty();
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  public ngOnChanges(changes) {
    if (changes.address) {
      this.calculateAddress();
      this.showClear = !this.emptyAddress;
    }

    this.editable = !this.disabled && !this.readonly;
  }

  public ngOnInit() {
    this.calculateAddress();
    this.initGoogleMap();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private calculateAddress() {
    this.emptyAddress = !this.address || (!(this.address.name) && !(this.address.street) &&
                        !(this.address.city) && !(this.address.region) &&
                        !(this.address.zip) && !(this.address.country));
  }

  private initGoogleMap() {
    this._ngZone.runOutsideAngular(() => {
      this._mapsAPILoader
        .load()
        .then(() => {
          this.googleAutocompleteService = new google.maps.places.AutocompleteService();
          this.googlePlacesService = new google.maps.places.PlacesService(this.searchElement.nativeElement);
        });
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
            this._cdRef.detectChanges();
          });
        });
    }
  }

  public addressChanged(event) {
    if (event.keyCode === ENTER) { return; }
    this._changeAddressDebounce$.next(event.currentTarget.value);
    this.autoComplete.openPanel();
  }

  // Search input can't be null. We implemented required validation to show asterisk if needed
  // But general validation placed in another level and not depends of this input
  // This hack allow us to show asterisk but disable extra validation
  private _defaultInputAddress() {
    return ' ';
  }

  public autocompleteSelected(option) {

    const place = option.value;
    const newAddress: FsAddress = this._createAddress();
    this.emptyAddress = true;

    new Promise(resolve => {

      // when something went wrong
      if (!place || !this.googlePlacesService) {
        resolve(true);
      }

      // when it's not an address it's "Just use" case
      if (place && !place.place_id) {
        this.addressChange.emit(place);
        resolve(true);
      }

      newAddress.description = place.description;
      this.googlePlacesService.getDetails(place, (result, status) => {
        this._ngZone.run(() => {

          if (status != google.maps.places.PlacesServiceStatus.OK) {
            return resolve(true);
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
              newAddress.zip !== result.name &&
              newAddress.street !== result.name) {

            if (this.config.name && this.config.name.visible !== false) {
              newAddress.name = result.name;
            }

          } else {
            newAddress.name = '';
          }

          resolve(newAddress);
          this.addressChange.emit(newAddress);
        });
      });

    }).then(() => {
      this.selecting = false;
      this.address = newAddress;
      this._cdRef.detectChanges();
      this.revalidate();
    }, () => {

    });
  }

  public focus() {
    this.selecting = true;
  }

  public blur() {
    this.selecting = false;
  }

  public functionPromise = () => {

    if (this.selecting === true) {
      return true;
    }

    return new Promise((resolve, reject) => {

        const requiredField = [];
        const parts = ['name', 'street', 'city', 'region', 'zip', 'country'];

        parts.forEach(part => {
          if (this.config[part] && this.config[part].required && !this.address[part]) {
            requiredField.push([part]);
          }
        });

        if (((this.config.lat && this.config.lat.required) ||
            (this.config.lng && this.config.lng.required)) &&
            (!this.address.lat || !this.address.lat)) {
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
          resolve(true);
        }
    });
  };

  public clear() {
    this.showClear = false;
    this.location = null;
    this.selecting = false;
    this.address = this._createAddress();
    this.inputAddress = this._defaultInputAddress();
    this.cleared.emit(this._createAddress());
    this.addressChange.emit(this._createAddress());
    const control = this._ngForm.controls[this.autocompleteName];
    control.markAsPristine();
    control.markAsUntouched();
    control.updateValueAndValidity();
  }

  public edit() {

    if (!this.editable) {
      return;
    }

    this.edited.emit();
  }

  private _createAddress(): FsAddress {
    return {
      name: '',
      description: '',
      country: '',
      region: '',
      city: '',
      street: '',
      address2: '',
      address3: '',
      zip: '',
      lat: null,
      lng: null,
    };
  }

}
