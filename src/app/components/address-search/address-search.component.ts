import {
  Component,
  ElementRef,
  EventEmitter,
  Renderer2,
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
import { each } from 'lodash-es';
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

  @Input() format = AddressFormat.OneLine;
  @Input() disabled = false;
  @Input() readonly = false;

  @Input() public  set config(value: IFsAddressConfig) {
    this._config = value;
    if (this._config) {
      this.updateRequiredStatus();
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
  @ViewChild('search', { static: true }) searchElement: ElementRef;
  @ViewChild(MatAutocompleteTrigger, { static: true }) trigger: MatAutocompleteTrigger;
  @ViewChild('search', { read: MatAutocompleteTrigger, static: true }) autoComplete: MatAutocompleteTrigger;

  public showEdit = false;
  public showClear = false;
  public predictions: any[] = [];
  public selecting = false;
  public googleAutocompleteService = null;
  public googlePlacesService = null;
  public location = '';
  public required = false;
  public emptyAddress = true;
  public autocompleteName = `search-${guid('xxxxxxxx')}`;

  private changeAddressDebounce = new Subject<any>();
  private destroy$ = new Subject<void>();
  private _config: IFsAddressConfig = {};

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    private _cdRef: ChangeDetectorRef,
  ) {
    this.changeAddressDebounce
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$),
      )
      .subscribe(value => {
        this.updatePredictions(value);
      });
  }

  public ngOnChanges(changes) {
    if (changes.address) {
      this.calculateAddress();
      this.showEdit = !this.emptyAddress;
      this.showClear = !this.emptyAddress;
    }
  }

  public ngOnInit() {
    this.calculateAddress();
    this.initGoogleMap();
  }

  public updateRequiredStatus() {
    this.required =
    ( (this.config.name && this.config.name.required) ||
      (this.config.country && this.config.country.required) ||
      (this.config.region && this.config.region.required) ||
      (this.config.city && this.config.city.required) ||
      (this.config.street && this.config.street.required) ||
      (this.config.zip && this.config.zip.required));

    setTimeout(() => {
      const labelRef = this.searchFormField
        .getConnectedOverlayOrigin()
        .nativeElement
        .querySelector('.mat-form-field-label');

      this.required ?
        this._renderer.addClass(labelRef, 'fs-form-label-required') :
        this._renderer.removeClass(labelRef, 'fs-form-label-required');
    });
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  public blur() {
    this.selecting = false;
  }

  public focus() {
    this.selecting = true;
  }

  public addressChanged(event) {
    if (event.keyCode === ENTER) { return; }

    this.changeAddressDebounce.next(event.currentTarget.value);
    this.autoComplete.openPanel();
  }

  public autocompleteSelected(option) {

    const place = option.value;
    const newAddress: FsAddress = this._createAddress();

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

      this._cdRef.detectChanges();
    });
  }

  public functionPromise = () => {

    return new Promise((resolve, reject) => {

      if (this.selecting) {
        return resolve();
      }

      const requiredField = [];
      const parts = ['name', 'street', 'city', 'region', 'zip', 'country'];

      each(parts, (part) => {
        if (this.config[part] && this.config[part].required && (this.address[part] === '' || !this.address[part])) {
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
        resolve();
      }
    });

  };

  public clear() {
    this.showEdit = false;
    this.showClear = false;
    this.location = null;
    this.cleared.emit(this._createAddress());
    this.addressChange.emit(this._createAddress());
  }

  public edit() {
    this.selecting = false;
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
      zip: '',
      lat: null,
      lng: null,
    };
  }
}
