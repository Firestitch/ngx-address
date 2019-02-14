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
import { IFsAddressConfig } from '../../interfaces/address-config.interface';

import { FsAddressSearchComponent } from '../address-search/address-search.component';
import { FsAddressComponent } from '../address/address.component';


@Component({
  selector: 'fs-address-picker',
  templateUrl: './address-picker.component.html',
  styleUrls: ['./address-picker.component.scss'],
})
export class FsAddressPickerComponent implements AfterViewInit {

  @Input() config: IFsAddressConfig;
  @Input() format = 'oneline';
  @Input() disabled = false;
  @Input() readonly = false;
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
    this.editable.search();
  }

  public searchEdited() {
    this.viewEdit();
  }

  public searchChanged(address) {
    this.addressChange.emit(address);
  }
}
