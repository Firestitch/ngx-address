import {
  Component,
  EventEmitter,
  Input,
  AfterViewInit,
  Output,
  ViewChild
} from '@angular/core';

// Interfaces
import { FsAddress, } from '../../interfaces/address.interface';
import { AddressPickerConfig } from '../../interfaces/address-config.interface';

import { FsAddressSearchComponent } from '../address-search/address-search.component';
import { FsAddressComponent } from '../address/address.component';
import { AddressFormat } from '../../enums/address-format.enum';


@Component({
  selector: 'fs-address-picker',
  templateUrl: './address-picker.component.html',
  styleUrls: ['./address-picker.component.scss'],
})
export class FsAddressPickerComponent implements AfterViewInit {

  @ViewChild(FsAddressComponent) addressComponent;

  @Input('config') set setConfig(config: AddressPickerConfig) {

    if (!config.format) {
      config.format = AddressFormat.OneLine;
    }

    config.search = true;
    config.map = { showMap: true };

    this.config = config;
  }

  @Input('format') set setFormat(value) {
    this.config.format = value;
  }

  @Input('disabled') set setDisabled(value) {
    this.config.disabled = value;
  }

  @Input('readonly') set setReadonly(value) {
    this.config.readonly = value;
  }

  @Input() address: FsAddress;
  @Output() addressChange = new EventEmitter();
  @Input('name')
  set name(value: string | boolean) {
    this._name = (value === 'true' || (typeof value === 'boolean' && value)) as boolean;
  }

  get name() {
    return this._name;
  }

  @ViewChild(FsAddressSearchComponent) public search: FsAddressSearchComponent;
  @ViewChild(FsAddressComponent) public editable: FsAddressComponent;

  public view = 'search';
  public config: AddressPickerConfig = {};
  private _name = true;

  constructor() {}

  public ngAfterViewInit() {
    this.viewSearch();
  }

  public viewSearch() {
    this.view = 'search';
  }

  public viewEdit() {
    this.view = 'edit';
  }

  public searchEdited() {
    this.viewEdit();
  }

  public recenter() {
    this.addressComponent.recenter();
  }
}
