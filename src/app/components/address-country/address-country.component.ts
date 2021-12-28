import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  Optional,
} from '@angular/core';
import { ControlContainer, NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { controlContainerFactory } from '@firestitch/core';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Countries } from '../../consts/countries.const';
import { searchCountryRegions } from '../../helpers';


@Component({
  selector: 'fs-address-country',
  templateUrl: './address-country.component.html',
  styleUrls: ['./address-country.component.scss'],
  providers: [   {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => FsAddressCountryComponent),
  } ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
})
export class FsAddressCountryComponent implements OnChanges, ControlValueAccessor {

  @Input() disabled = false;
  @Input() required = false;
  @Input() excludeCountries: string[];
  @Input() countries = Countries;
  @Input()
  public set placeholder(value) {
    this._placeholder = value || 'Country';
  }

  public get placeholder(): string {
    return this._placeholder;
  }

  @Output() selectionChange = new EventEmitter<any>();

  public country;
  public onChange = (data: any) => {};
  public onTouched = () => {};

  private _placeholder: string = null;

  constructor(private _cdRef: ChangeDetectorRef) {}

  public fetch = (keyword: string) => {
    return of(keyword)
      .pipe(
        map((kw) => {
          return searchCountryRegions(kw, this.countries, 10);
        }),
      )
  }

  public displayWith = (data) => {
    return data.name;
  };

  public writeValue(data: any): void {
    if (data) {
      this.country = this.countries.find((country) => country.code === data);
      this._cdRef.markForCheck();
    } else {
      this.country = data;
    }
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
      })
    }
  }
}
