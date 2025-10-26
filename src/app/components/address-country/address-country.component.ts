import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Optional, Output, SimpleChanges, forwardRef, inject } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm, FormsModule } from '@angular/forms';

import { guid } from '@firestitch/common';
import { controlContainerFactory } from '@firestitch/core';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Countries } from '../../consts/countries.const';
import { searchCountryRegions } from '../../helpers';
import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsFormModule } from '@firestitch/form';


@Component({
    selector: 'fs-address-country',
    templateUrl: './address-country.component.html',
    styleUrls: ['./address-country.component.scss'],
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => FsAddressCountryComponent),
        }],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: controlContainerFactory,
            deps: [[new Optional(), NgForm]],
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsAutocompleteChipsModule,
        FormsModule,
        FsFormModule,
    ],
})
export class FsAddressCountryComponent implements OnChanges, ControlValueAccessor {
  private _cdRef = inject(ChangeDetectorRef);


  @Input() public disabled = false;
  @Input() public required = false;
  @Input() public excludeCountries: string[];
  @Input() public countries = Countries;
  @Input() public label = 'Country';
  

  @Output() public selectionChange = new EventEmitter<any>();

  public country;
  public name = `addressCountry${guid()}`;
  public onChange: (data: any) => void;
  public onTouched: () => void;

  public fetch = (keyword: string) => {
    return of(keyword)
      .pipe(
        map((kw) => {
          return searchCountryRegions(kw, this.countries, 10);
        }),
      );
  };

  public writeValue(data: any): void {
    this.country = this.countries
      .find((country) => country.code === data);
    this._cdRef.markForCheck();
  }

  public changed(value) {
    const code = value?.code;
    this.onChange(code);
    this.selectionChange.emit(code);
  }

  public registerOnChange(fn: (data: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.excludeCountries && changes.excludeCountries.currentValue) {
      this.countries = this.countries.filter((country) => {
        return this.excludeCountries.indexOf(country.code) === -1;
      });
    }
  }
}
