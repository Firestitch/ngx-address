import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  NgZone,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NgControl,
  NgForm,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import { MatFormFieldControl } from '@angular/material/form-field';

import { guid } from '@firestitch/common';
import { controlContainerFactory } from '@firestitch/core';
import { FsMap } from '@firestitch/map';

import { fromEvent, Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

import { AddressFormat } from '../../enums/address-format.enum';
import { addressIsEmpty } from '../../helpers/address-is-empty';
import { createEmptyAddress } from '../../helpers/create-empty-address';
import { extractUnit } from '../../helpers/extract-unit';
import { googlePlaceToFsAddress } from '../../helpers/google-place-to-address';
import { FsAddressConfig } from '../../interfaces/address-config.interface';
import { FsAddress } from '../../interfaces/address.interface';


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
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    },
  ],
})
export class FsAddressAutocompleteComponent
implements OnInit, MatFormFieldControl<FsAddress>, ControlValueAccessor, Validator {

  public static nextId = 0;

  @Input()
  public format = AddressFormat.TwoLine;

  @Input()
  public readonly = false;

  @Input()
  public showClear = true;

  @Input()
  public suggestions = false;

  @Input()
  public set config(value: FsAddressConfig) {
    this._config = value;
    if (this._config) {
      this.required =
        ((this.config.name && this.config.name.required) ||
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

  @Output()
  public readonly addressManual = new EventEmitter<string>();

  @ViewChild('searchInput', { static: true, read: ElementRef })
  public readonly searchElement: ElementRef;

  @ViewChild(MatAutocomplete, { static: true })
  public readonly autoCompleteRef: MatAutocomplete;

  @ViewChild(MatAutocompleteTrigger, { static: true })
  public readonly autocompleteTrigger: MatAutocompleteTrigger;

  @HostBinding()
  public id = `fs-address-autocomplete-${FsAddressAutocompleteComponent.nextId++}`;

  public inputAddress: FsAddress = this._defaultInputAddress();
  public googleSuggestions: google.maps.places.AutocompleteSuggestion[] = [];
  public googlePlace: google.maps.places.Place = null;
  public onChange: (data: any) => void;
  public onTouched: () => void;
  public errorState = false;
  public focused = false;
  public stateChanges = new Subject<void>();
  public readonly autocompleteName = `search-${guid('xxxxxxxx')}`;

  private _config: FsAddressConfig = {};
  private _address: FsAddress = {};
  private _searchText = '';
  private _disabled = false;
  private _required = false;
  private _placeholder: string;

  private _destroyRef = inject(DestroyRef);

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _map: FsMap,
    private _ngZone: NgZone,
    private _fm: FocusMonitor,
    private _elementRef: ElementRef,
    private _cdRef: ChangeDetectorRef,
  ) {
    if (this.ngControl) {
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
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next(null);
  }

  @Input()
  public get required() {
    return this._required;
  }
  public set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next(null);
  }

  @Input()
  public get placeholder() {
    return this._placeholder;
  }
  public set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next(null);
  }

  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused;
  }

  public get empty(): boolean {
    return addressIsEmpty(this.value);
  }

  public ngOnInit() {
    this._initGoogleMap();
    this._listenUserTyping();
    this._listenAutocompleteSelection();
    this._registerFocusMonitor();
    this.ngControl.control.setValidators([this.validate.bind(this)]);
  }

  public writeValue(value: FsAddress | null) {
    this._address = value;
    this.inputAddress = value;
    this._cdRef.markForCheck();
  }

  public setDescribedByIds(ids: string[]) {
    // TODO
  }

  public onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
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
      return '';
    }
  };

  public validate(control: AbstractControl): ValidationErrors | null {
    const validationErrors: ValidationErrors = {};
    const requiredField = [];
    const parts = ['name', 'street', 'city', 'region', 'zip', 'country'];

    if (this.required && this.empty) {
      validationErrors.required = true;
    }

    if (!this.empty) {
      parts.forEach((part) => {
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
    this.addressChange.emit(null);
    this._clearPredictions();
    setTimeout(() => {
      this.autocompleteTrigger.openPanel();
    });
  }

  public manual(value: string): void {
    this.addressManual.emit(value);
  }

  public reset(): void {
    this.ngControl.reset(createEmptyAddress());
  }

  // Search input can't be null. We implemented required validation to show asterisk if needed
  // But general validation placed in another level and not depends of this input
  // This hack allow us to show asterisk but disable extra validation
  private _defaultInputAddress() {
    return null;
  }

  private _listenUserTyping(): void {
    this._ngZone.runOutsideAngular(() => {

      fromEvent(this.searchElement.nativeElement, 'keydown')
        .pipe(
          filter((event: KeyboardEvent) => event.code === 'Tab'),
          map(() => this.autocompleteTrigger.activeOption?.value),
          filter((place) => !!place && this.googleSuggestions.length !== 0),
          switchMap((place) => this._placeToAddress(place)),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe((address: FsAddress) => {
          this._selectAddress(address);
          this._clearPredictions();
        });

      fromEvent(this.searchElement.nativeElement, 'keyup')
        .pipe(
          tap(() => {
            this.stateChanges.next(null);
          }),
          debounceTime(200),
          filter((event: KeyboardEvent) => {
            return event.code !== 'Enter' && event.code !== 'Tab';
          }),
          map((event: KeyboardEvent) => {
            return (event.target as HTMLInputElement).value;
          }),
          tap((text) => {
            if (!text) {
              this._clearPredictions();
            }
          }),
          filter((value) => !!value),
          tap((value) => {
            this._searchText = value;
            if (!value) {
              this._address = {
                ...this._address,
                street: value,
              };

              this._selectAddress(this._address);
            }
          }),
          distinctUntilChanged(),
          switchMap((text: string) => {
            return this._getPlaceSuggestions(text);
          }),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe((suggestions: google.maps.places.AutocompleteSuggestion[]) => {
          this._ngZone.run(() => {
            this.googleSuggestions = [
              ...suggestions,
            ];

            this._cdRef.markForCheck();
          });
        });
    });
  }

  private _clearPredictions() {
    this.googleSuggestions = [];
    this._cdRef.markForCheck();
  }

  private _selectAddress(address) {
    this.value = address;
    this.addressChange.emit(address);
  }

  private _placeToAddress(suggestion: google.maps.places.AutocompleteSuggestion): Observable<FsAddress> {
    if (!suggestion || !this.googlePlace) {
      return of(null);
    }

    const place = suggestion.placePrediction.toPlace();
    const fetchFieldsRequestOptions: google.maps.places.FetchFieldsRequest = {
      fields: [
        'displayName',
        'location',
        'addressComponents',
        'formattedAddress',
      ],
    };

    // TODO
    // if (place && !place.place_id) {
    //   return of({
    //     ...this.value,
    //     street: place.name,
    //   });
    // }

    return fromPromise(place.fetchFields(fetchFieldsRequestOptions))
      .pipe(
        map(({ place }: {place: google.maps.places.Place}): FsAddress => {
          if (!place) {
            return {};
          }

          return googlePlaceToFsAddress(place, this.config);
        }),
      );
  }

  private _listenAutocompleteSelection(): void {
    this.autoCompleteRef.optionSelected
      .pipe(
        map((event: MatAutocompleteSelectedEvent) => event.option),
        // used to get the value from input when "manual" option selected
        filter((option: MatOption<{ manual: boolean, value: string} | google.maps.places.AutocompleteSuggestion>) => {
          if (option.value instanceof google.maps.places.AutocompleteSuggestion) {
            return true;
          }

          this.manual(option.value.value);

          return false;
        }),
        map((option) => {
          return option.value;
        }),
        switchMap((value: google.maps.places.AutocompleteSuggestion) => this._placeToAddress(value)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((address: FsAddress) => {
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
      });
  }

  private _initGoogleMap() {
    this._ngZone.runOutsideAngular(() => {
      this._map.loaded$
        .pipe(
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe(() => {
          this.googlePlace = new google.maps.places.Place({ id: this.id, });
        });
    });
  }

  private _getPlaceSuggestions(address: string): Promise<google.maps.places.AutocompleteSuggestion[]> {
    const { text } = extractUnit(address);
    const placesRequest = google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
      { input: text }
    );

    return placesRequest
      .then((result) => {
        return result.suggestions;
      })
      .catch(() => {
        return [];
      });
  }

  private _registerFocusMonitor(): void {
    this._fm.monitor(this._elementRef, true)
      .pipe(
        filter(() => !this.disabled),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((origin) => {
        this.focused = !!origin;
        this.stateChanges.next(null);
      });
  }
}
