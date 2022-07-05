import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  Optional,
  Self,
} from '@angular/core';
import {
  NgControl,
  ControlValueAccessor,
  Validator,
  ValidationErrors,
  AbstractControl,
  NgModel,
} from '@angular/forms';

import { MatFormFieldControl } from '@angular/material/form-field';
import { MatAutocomplete } from '@angular/material/autocomplete';

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

import { guid } from '@firestitch/common';

import { MapsAPILoader } from '@agm/core';

import { bindCallback, fromEvent, Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil, tap,
} from 'rxjs/operators';


import { FsAddress } from '../../interfaces/address.interface';
import { FsAddressConfig } from '../../interfaces/address-config.interface';
import { AddressFormat } from '../../enums/address-format.enum';
import { googleDetailsToAddress } from '../../helpers/google-details-to-address';
import { createEmptyAddress } from '../../helpers/create-empty-address';
import { addressIsEmpty } from '../../helpers/address-is-empty';
import { extractUnit } from '../../helpers/extract-unit';


@Component({
  selector: 'fs-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: FsAddressAutocompleteComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressAutocompleteComponent
  implements OnInit, OnDestroy, MatFormFieldControl<FsAddress>, ControlValueAccessor, Validator {

  public static nextId = 0;

  @Input()
  public format = AddressFormat.TwoLine;

  @Input()
  public readonly = false;

  @Input()
  public name = true;

  @Input()
  public suggestions = false;

  @Input()
  public set config(value: FsAddressConfig) {
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

  public get config(): FsAddressConfig {
    return this._config;
  }

  @Output()
  public readonly addressChange = new EventEmitter();

  @ViewChild('searchInput', { static: true })
  public readonly searchElement: ElementRef;

  @ViewChild(MatAutocomplete, { static: true })
  public readonly autoCompleteRef: MatAutocomplete;

  @HostBinding()
  public id = `fs-address-autocomplete-${FsAddressAutocompleteComponent.nextId++}`;

  public inputAddress: string | FsAddress = this._defaultInputAddress();
  public predictions: any[] = [];
  public googleAutocompleteService: google.maps.places.AutocompleteService = null;
  public googlePlacesService: google.maps.places.PlacesService = null;

  // Control Accessor
  public onChange = (data: any) => {};
  public onTouched = () => {};

  // Material
  public errorState = false;
  public focused = false;
  public stateChanges = new Subject<void>();
  //

  public readonly autocompleteName = `search-${guid('xxxxxxxx')}`;

  private _config: FsAddressConfig = {};
  private _address: FsAddress = {};
  private _searchText = '';

  // Material
  private _disabled = false;
  private _required = false;
  private _placeholder: string;
  //

  private _destroy$ = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _fm: FocusMonitor,
    private _elementRef: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _ngModel: NgModel,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public set value(value: FsAddress) {
    this._address = value;
    this.onChange(this._address);
  }

  public get value(): FsAddress {
    return this._address;
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused || !(this.value && !this.value.street);
  }

  public get empty(): boolean {
    if (this.suggestions) {
      return (!this.inputAddress && !this.value?.street) || (this.inputAddress && !this.value?.street);
    } else {
      const inputValue = (typeof this.inputAddress === 'string') && this.inputAddress.trim();

      return this.addressIsEmpty && !inputValue;
    }
  }

  public get addressIsEmpty(): boolean {
    return addressIsEmpty(this.value);
  }

  public ngOnInit() {
    this.initGoogleMap();

    this._listenUserTyping();
    this._listenAutocompleteSelection();
    this._registerFocusMonitor();

    this.ngControl.control.setValidators([this.validate.bind(this)]);
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public writeValue(value: FsAddress | null) {
    this._address = value;
    this.inputAddress = '';
  }

  public setDescribedByIds(ids: string[]) {
    // TODO
  }

  public onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.searchElement.nativeElement.focus();
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }

  public registerOnChange(fn: (data: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public displayWith = (value: FsAddress) => {
    if (value && typeof value === 'object') {
      return this.value?.street;
    } else if (!this.empty) {
      return ' ';
    }
  };

  public validate(control: AbstractControl): ValidationErrors | null {
    const validationErrors: ValidationErrors = {};

    const requiredField = [];
    const parts = ['name', 'street', 'city', 'region', 'zip', 'country'];

    if (this.required && this.addressIsEmpty) {
      validationErrors.required = true;
    }

    if (!this.addressIsEmpty) {
      parts.forEach(part => {
        if (this.config[part] && this.config[part].required && !this.value[part]) {
          requiredField.push([part]);
        }
      });

      if (((this.config.lat && this.config.lat.required) ||
        (this.config.lng && this.config.lng.required)) &&
        (!this.value.lat || !this.value.lat)) {
        validationErrors.invalid = 'position on map';
      }

      if (requiredField.length) {
        if (requiredField.length === 1) {
          validationErrors.invalid = `The ${requiredField[0]} is required`;
        } else {
          const last = requiredField.pop();
          validationErrors.invalid = `The ${requiredField.join(', ')} and ${last} are required`;
        }
      }
    }

    return validationErrors;
  }

  public clear(): void {
    this.inputAddress = this._defaultInputAddress();
    this.value = createEmptyAddress();
    this.ngControl?.control.setValue(this.value);
  }

  public reset(): void {
    this.ngControl.reset(createEmptyAddress());
  }

  public autocompletePanelClosed(): void {
    if (this.addressIsEmpty && !!this.inputAddress) {
      this.inputAddress = null;
    }
  }

  public blurAutocompleteInput() {
    if (this.empty
      && typeof this.inputAddress === 'string'
      && this.inputAddress !== '') {
      this.inputAddress = '';
    }
  }

  // Search input can't be null. We implemented required validation to show asterisk if needed
  // But general validation placed in another level and not depends of this input
  // This hack allow us to show asterisk but disable extra validation
  private _defaultInputAddress() {
    return ' ';
  }

  private _listenUserTyping(): void {
    this._ngZone.runOutsideAngular(() => {
      fromEvent(this.searchElement.nativeElement, 'keyup')
        .pipe(
          tap(() => {
            this.stateChanges.next();
          }),
          debounceTime(200),
          filter((event: KeyboardEvent) => {
            return event.code !== 'Enter';
          }),
          map((event: KeyboardEvent) => {
            return (event.target as HTMLInputElement).value;
          }),
          tap((value) => {
            this._searchText = value;
            if (!value) {
              this._address = {
                ...this._address,
                street: value,
              };

              this.value = this._address;
              this.addressChange.emit(this.value);
            }
          }),
          filter((text) => {
            const textExists = !!text;

            if (!textExists) {
              this.predictions = [];

              this._cdRef.markForCheck();
            }

            return textExists;
          }),
          distinctUntilChanged(),
          switchMap((text: string) => {
            return this._getPlacePredictions(text);
          }),
          takeUntil(this._destroy$),
        )
        .subscribe(({value, predictions}) => {
          this._ngZone.run(() => {
            this.predictions = [
              ...predictions,
            ];

            this._cdRef.markForCheck();
          })
        });
    });
  }

  private _listenAutocompleteSelection(): void {
    this.autoCompleteRef.optionSelected
      .pipe(
        map((option) => {
          return option.option.value;
        }),
        switchMap((place) => {
          if (!place || !this.googlePlacesService) {
            return of(null);
          }

          if (place && !place.place_id) {
            return of({
              ...this.value,
              street: place.name,
              manual: true,
            });
          }

          return this._getPlaceDetails(place);
        }),
        map((response) => {
          let address: FsAddress;

          if (response.result) {
            address = googleDetailsToAddress(response.result, this.config);
            address.description = response.place.description;
          } else {
            address = response;
          }

          return address;
        }),
        takeUntil(this._destroy$),
      )
      .subscribe((address) => {
        this._ngZone.run(() => {
          this.searchElement.nativeElement.blur();
          this.value = address;

          const { unit } = extractUnit(this._searchText);
          if (unit) {
            address.address2 = unit;
          }

          this.addressChange.emit(address);
          this.inputAddress = address;

          this._cdRef.markForCheck();
        });
      })
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

  private _getPlacePredictions(address: string) {
    const { text } = extractUnit(address);
    const placesRequest = this.googleAutocompleteService
      .getPlacePredictions(
        { input: text },
        () => {}
      ) as unknown as Promise<{ predictions: google.maps.places.AutocompletePrediction[]}>;

    return placesRequest
      .then((result) => {
        return {
          value: text,
          predictions: result?.predictions || [],
        }
      })
      .catch(() => {
        return {
          value: text,
          predictions: [],
        }
      });
  }

  private _getPlaceDetails(
    place: google.maps.places.PlaceDetailsRequest
  ): Observable<{ result: google.maps.places.PlaceResult, place: google.maps.places.PlaceDetailsRequest }> {
    const getDetailsFactory = bindCallback(
      this.googlePlacesService.getDetails.bind(this.googlePlacesService)
    ) as any;

    return getDetailsFactory(place)
      .pipe(
        map(([result, status]) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return null;
          } else {
            return {
              place,
              result,
            };
          }
        })
      );
  }

  private _registerFocusMonitor(): void {
    this._fm.monitor(this._elementRef, true)
      .pipe(
        filter(() => !this.disabled),
        takeUntil(this._destroy$),
      )
      .subscribe((origin) => {
        this.focused = !!origin;
        this.stateChanges.next();
      })
  }
}
