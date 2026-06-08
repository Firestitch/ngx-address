import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  inject,
  Injector,
  Input,
  NgZone,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, NgForm, ValidationErrors, Validator } from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { ErrorStateMatcher, MatOption as MatOption_1 } from '@angular/material/core';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { FsClearModule } from '@firestitch/clear';
import { guid } from '@firestitch/common';
import { controlContainerFactory } from '@firestitch/core';
import { FsFormModule } from '@firestitch/form';
import { FsMap } from '@firestitch/map';

import { from, fromEvent, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AddressFormat } from '../../enums/address-format.enum';
import { addressIsEmpty } from '../../helpers/address-is-empty';
import { createEmptyAddress } from '../../helpers/create-empty-address';
import { extractUnit } from '../../helpers/extract-unit';
import { googleLegacyPlaceToFsAddress } from '../../helpers/google-legacy-place-to-address';
import { googlePlaceToFsAddress } from '../../helpers/google-place-to-address';
import { FsAddressConfig } from '../../interfaces/address-config.interface';
import { FsAddress } from '../../interfaces/address.interface';


/**
 * A single, API-agnostic autocomplete option. Both the new
 * (`AutocompleteSuggestion`) and the legacy (`AutocompleteService`) paths are
 * normalized to this shape so the template and selection handlers never have to
 * know which Google API produced it. `resolve()` lazily fetches the full place
 * details and maps them to an FsAddress only once the option is actually picked.
 */
interface FsAddressSuggestion {
  description: string;
  resolve: () => Observable<FsAddress>;
}


@Component({
  selector: 'fs-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    },
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FsAddressAutocompleteComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FsAddressAutocompleteComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatAutocompleteTrigger,
    FsFormModule,
    FsClearModule,
    MatAutocomplete,
    MatOption_1,
    MatHint,
    NgClass,
    FsFormModule,
  ],
})
export class FsAddressAutocompleteComponent implements OnInit, ControlValueAccessor, Validator {

  public static nextId = 0;

  @Input()
  public format = AddressFormat.TwoLine;

  @Input()
  public readonly = false;

  @Input()
  public showClear = true;

  @Input() public formFieldClass: string;

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
  public googleSuggestions: FsAddressSuggestion[] = [];
  public onChange: (data: any) => void;
  public onTouched: () => void;
  public focused = false;
  public readonly autocompleteName = `search-${guid('xxxxxxxx')}`;

  // The inner matInput has no validators of its own — the required/address validation
  // lives on the outer control (the ngModel bound to <fs-address-autocomplete>). This
  // matcher mirrors FsForm's global rule (invalid && touched && dirty) but reads the
  // outer control, so the mat-form-field paints its error state like every other field.
  public readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: () => {
      const control = this._hostNgControl;

      return !!(control && control.invalid && control.touched && control.dirty);
    },
  };

  private _config: FsAddressConfig = {};
  private _address: FsAddress = {};
  private _searchText = '';
  private _lastSearchText: string;
  private _optionSelected = false;
  private _disabled = false;
  private _required = false;
  private _placeholder: string;
  private _mapLoaded = false;
  // Lazily-created legacy services (only used when no googleConfig.autocomplete
  // filter is set). PlacesService needs a DOM node to attribute results to.
  private _legacyAutocompleteService: google.maps.places.AutocompleteService;
  private _legacyPlacesService: google.maps.places.PlacesService;
  private _map = inject(FsMap);
  private _ngZone = inject(NgZone);
  private _fm = inject(FocusMonitor);
  private _elementRef = inject(ElementRef);
  private _cdRef = inject(ChangeDetectorRef);
  private _destroyRef = inject(DestroyRef);
  private _injector = inject(Injector);
  private _ngControl: NgControl | null = null;

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
  }

  @Input()
  public get required() {
    return this._required;
  }

  public set required(req) {
    this._required = coerceBooleanProperty(req);
  }

  @Input()
  public get placeholder() {
    return this._placeholder;
  }
  public set placeholder(plh) {
    this._placeholder = plh;
  }

  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused;
  }

  public get empty(): boolean {
    return addressIsEmpty(this.value);
  }

  // Lazily resolve the outer control (the ngModel applied to this component's host).
  // It isn't available at construction (would create an NG_VALUE_ACCESSOR DI cycle),
  // so we look it up on demand and cache once found.
  private get _hostNgControl(): NgControl | null {
    if (!this._ngControl) {
      this._ngControl = this._injector.get(NgControl, null, { self: true, optional: true });
    }

    return this._ngControl;
  }

  public ngOnInit() {
    this._initGoogleMap();
    this._listenUserTyping();
    this._listenAutocompleteSelection();
    this._listenPanelClose();
    this._registerFocusMonitor();
  }

  public writeValue(value: FsAddress | null) {
    this._address = value;
    this.inputAddress = value;
    this._cdRef.markForCheck();
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

  // public validateIT = () => {
  //   const validationErrors = this.validate();

  //   if(validationErrors.invalid) {
  //     throw new Error(validationErrors.invalid);
  //   }
  // };

  public validate(): ValidationErrors | null {
    const validationErrors: ValidationErrors = {};
    const requiredField = [];
    const parts = ['name', 'street', 'city', 'address2', 'address3', 'region', 'zip', 'country', 'lat', 'lng'];

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
    this.addressChange.emit(null);
    // Reset the dedupe tracker so retyping the just-cleared text searches again.
    this._lastSearchText = undefined;
    this._clearPredictions();
    setTimeout(() => {
      this.searchElement.nativeElement.focus();
      this.autocompleteTrigger.openPanel();
    });
  }

  public manual(value: string): void {
    this.addressManual.emit(value);
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
          filter((value) => !!value && !value.manual && this.googleSuggestions.length !== 0),
          // Tab-select doesn't go through the panel's optionSelected, so flag it
          // here too — otherwise the panel-close handler would treat it as "no
          // selection" and clear the address being committed.
          tap(() => this._optionSelected = true),
          switchMap((suggestion: FsAddressSuggestion) => suggestion.resolve()),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe((address: FsAddress) => {
          this._selectAddress(address);
          this._clearPredictions();
        });

      fromEvent(this.searchElement.nativeElement, 'keyup')
        .pipe(
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
          // Dedupe consecutive identical searches, but track the value ourselves
          // (rather than distinctUntilChanged) so it can be reset when the input is
          // cleared on blur — otherwise retyping the same text wouldn't search.
          filter((text) => text !== this._lastSearchText),
          tap((text) => this._lastSearchText = text),
          switchMap((text: string) => {
            return this._getPlaceSuggestions(text);
          }),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe((suggestions: FsAddressSuggestion[]) => {
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

  private _listenAutocompleteSelection(): void {
    this.autoCompleteRef.optionSelected
      .pipe(
        map((event: MatAutocompleteSelectedEvent) => event.option),
        // used to get the value from input when "manual" option selected
        filter((option: MatOption<{ manual: boolean, value: string } | FsAddressSuggestion>) => {
          const value = option.value as { manual?: boolean, value?: string };

          // The "Enter address manually" option carries `{ manual: true }`;
          // everything else is a normalized address suggestion.
          if (value?.manual) {
            this.manual(value.value);

            return false;
          }

          return true;
        }),
        map((option) => option.value as FsAddressSuggestion),
        switchMap((suggestion: FsAddressSuggestion) => suggestion.resolve()),
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
          this._mapLoaded = true;
        });
    });
  }

  /**
   * Hybrid API selection. The NEW Places API (`AutocompleteSuggestion`) is only
   * used when a `googleConfig.autocomplete` filter is configured — that's the
   * only thing the legacy API can't do (e.g. `includedPrimaryTypes: ['pharmacy']`),
   * and it requires "Places API (New)" to be enabled on the key. Everything else
   * goes through the LEGACY `AutocompleteService`, which works on keys that only
   * have the classic "Places API" enabled — no Google Cloud changes required.
   */
  private _useNewPlacesApi(): boolean {
    return !!this.config?.googleConfig?.autocomplete;
  }

  private _getPlaceSuggestions(address: string): Promise<FsAddressSuggestion[]> {
    if (!this._mapLoaded) {
      return Promise.resolve([]);
    }

    const { text } = extractUnit(address);

    return this._useNewPlacesApi()
      ? this._fetchSuggestionsNew(text)
      : this._fetchSuggestionsLegacy(text);
  }

  // --- NEW Places API (AutocompleteSuggestion) -----------------------------

  private _fetchSuggestionsNew(text: string): Promise<FsAddressSuggestion[]> {
    const request: google.maps.places.AutocompleteRequest = {
      // Caller-supplied Places options (types, region, location bias, etc).
      // Spread first so `input` always wins and can't be overridden.
      ...this.config?.googleConfig?.autocomplete,
      input: text,
    };

    return google.maps.places.AutocompleteSuggestion
      .fetchAutocompleteSuggestions(request)
      .then((result) => result.suggestions.map((suggestion): FsAddressSuggestion => ({
        description: suggestion.placePrediction.text.text,
        resolve: () => this._resolveNewSuggestion(suggestion),
      })))
      .catch((error) => {
        this._logNewPlacesApiError('fetch autocomplete suggestions', error);

        return [];
      });
  }

  private _resolveNewSuggestion(
    suggestion: google.maps.places.AutocompleteSuggestion,
  ): Observable<FsAddress> {
    const place = suggestion.placePrediction.toPlace();
    const fetchFieldsRequestOptions: google.maps.places.FetchFieldsRequest = {
      fields: [
        'displayName',
        'location',
        'addressComponents',
        'formattedAddress',
      ],
    };

    return from(place.fetchFields(fetchFieldsRequestOptions))
      .pipe(
        map(({ place: fetched }: { place: google.maps.places.Place }): FsAddress => {
          if (!fetched) {
            return {};
          }

          return googlePlaceToFsAddress(fetched, this.config);
        }),
        catchError((error) => {
          this._logNewPlacesApiError('fetch place details', error);

          return of<FsAddress>({});
        }),
      );
  }

  /**
   * Air out exactly why the NEW Places API call failed. The most common cause is
   * the key/project not having "Places API (New)" enabled (Google returns a
   * PERMISSION_DENIED / REQUEST_DENIED style error) — having the legacy "Places
   * API" enabled is NOT sufficient. This is logged loudly so the failure is
   * obvious in the console instead of silently showing an empty dropdown.
   */
  private _logNewPlacesApiError(stage: string, error: unknown): void {
    const message =
      (error as { message?: string })?.message ?? String(error);
    const denied =
      /permission|denied|not authorized|REQUEST_DENIED|ApiNotActivated|ApiTargetBlocked|not have permission/i
        .test(message);

    const lines = [
      `[fs-address] Google Places autocomplete failed (${stage}) using the NEW Places API ` +
        '(AutocompleteSuggestion / Place — places.googleapis.com).',
      'This API path is active because a `googleConfig.autocomplete` filter ' +
        '(e.g. includedPrimaryTypes: ["pharmacy"]) is configured, which the legacy ' +
        'Places API cannot do.',
    ];

    if (denied) {
      lines.push(
        '>>> The request was DENIED by Google. Most likely "Places API (New)" is NOT ' +
          'enabled for this API key / project (the legacy "Places API" being enabled is ' +
          'NOT enough), or the key\'s API/HTTP-referrer restrictions exclude it. ' +
          'Fix: enable "Places API (New)" in Google Cloud Console for this key — or ' +
          'remove the googleConfig.autocomplete filter to fall back to the legacy API.',
      );
    }

    lines.push(`Original error: ${message}`);

    console.error(lines.join('\n'), error);
  }

  // --- LEGACY Places API (AutocompleteService / PlacesService) --------------

  private _fetchSuggestionsLegacy(text: string): Promise<FsAddressSuggestion[]> {
    if (!this._legacyAutocompleteService) {
      this._legacyAutocompleteService = new google.maps.places.AutocompleteService();
    }

    return new Promise((resolve) => {
      this._legacyAutocompleteService.getPlacePredictions(
        { input: text },
        (predictions, status) => {
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !predictions
          ) {
            // ZERO_RESULTS just means "no matches" — not a failure worth logging.
            if (status !== google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              console.error(
                '[fs-address] Google Places autocomplete failed using the LEGACY Places ' +
                  `API (AutocompleteService.getPlacePredictions). Status: ${status}. ` +
                  'If this is REQUEST_DENIED, the key is missing the classic "Places API", ' +
                  'or has HTTP-referrer / billing restrictions blocking it.',
              );
            }

            resolve([]);

            return;
          }

          resolve(predictions.map((prediction): FsAddressSuggestion => ({
            description: prediction.description,
            resolve: () => this._resolveLegacyPrediction(prediction.place_id),
          })));
        },
      );
    });
  }

  private _resolveLegacyPrediction(placeId: string): Observable<FsAddress> {
    if (!this._legacyPlacesService) {
      this._legacyPlacesService = new google.maps.places.PlacesService(
        document.createElement('div'),
      );
    }

    return new Observable<FsAddress>((observer) => {
      this._legacyPlacesService.getDetails(
        {
          placeId,
          fields: [
            'name',
            'geometry',
            'address_components',
            'formatted_address',
            'place_id',
          ],
        },
        (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            observer.next(googleLegacyPlaceToFsAddress(result, this.config));
          } else {
            console.error(
              '[fs-address] Failed to fetch place details using the LEGACY Places API ' +
                `(PlacesService.getDetails). Status: ${status}.`,
            );
            observer.next({});
          }

          observer.complete();
        },
      );
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

        // Mark the outer control as touched on blur so its error state activates
        // like a regular form field once the user leaves an invalid field.
        if (!origin) {
          this.onTouched?.();
        }
      });
  }

  // The autocomplete closes after a pick (preceded by optionSelected) or when the
  // user leaves the field. If no option was chosen this session, the typed text
  // never resolved to an address — reset the input to the committed value (which
  // clears it when empty) so we don't leave orphaned search text behind.
  private _listenPanelClose(): void {
    this.autoCompleteRef.optionSelected
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._optionSelected = true);

    this.autoCompleteRef.closed
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        const optionSelected = this._optionSelected;
        this._optionSelected = false;

        if (!optionSelected) {
          this._resetInputToValue();
        }
      });
  }

  // Sync the input display back to the committed address: show it when one exists,
  // clear it otherwise. Also drops stale predictions and resets the search tracker
  // so refocusing and retyping the same text searches fresh.
  private _resetInputToValue(): void {
    this._lastSearchText = undefined;
    this.inputAddress = this.empty ? this._defaultInputAddress() : this.value;
    this._clearPredictions();
    this._cdRef.markForCheck();
  }
}
