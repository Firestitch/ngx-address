import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Countries } from '../../consts/countries.const';


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
  public countries = Countries;
  public onChange = (data: any) => {};
  public onTouched = () => {};

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
