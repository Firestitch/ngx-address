import { Component, EventEmitter, Inject, Input, OnInit, Output, forwardRef } from '@angular/core';
import { COUNTRIES } from '../../constants/inject-token-countries';
import { ControlContainer, NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'fs-address-country',
  templateUrl: './address-country.component.html',
  styleUrls: ['./address-country.component.scss'],
  providers: [   {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => FsAddressCountryComponent),
  } ]
})
export class FsAddressCountryComponent implements ControlValueAccessor {

  @Input() disabled = false;
  @Input() required = false;
  @Output() selectionChange = new EventEmitter<any>();

  public country;
  public countries = [];
  public onChange = (data: any) => {};
  public onTouched = () => {};

  constructor(@Inject(COUNTRIES) countries) {
    this.countries = countries;
  }

  public writeValue(data: any): void {
    this.country = data;
  }

  public changed(value) {
    this.onChange(value);
    this.selectionChange.emit(value);
  }

  public registerOnChange(fn: (data: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
