import {
  Component,
  EventEmitter,
  Input,
  AfterViewInit,
  Output,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  IFsAddressConfig,
  FsAddress,
} from '../../interfaces';

import { FsAddressSearchComponent } from '../fs-address-search';


@Component({
  selector: 'fs-address-picker',
  templateUrl: './fs-address-picker.component.html',
  styleUrls: ['./fs-address-picker.component.scss'],
})
export class FsAddressPickerComponent implements AfterViewInit {

  @Input() _address: FsAddress;
  @Input() config: IFsAddressConfig;
  @Input() format = 'oneline';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input('name')
  set name(value: string | boolean) {
    this._name = (value === 'true' || (typeof value === 'boolean' && value)) as boolean;
  }

  get name() {
    return this._name;
  }

  @ViewChild(FsAddressSearchComponent) search: FsAddressSearchComponent;

  @Input() get address() {
    return this._address;
  }
  @Output() addressChange = new EventEmitter();
  set address(address: FsAddress) {
    this._address = address;
    this.addressChange.emit(this._address);
  }

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
  }

  public searchEdited() {
    this.viewEdit();
  }

  public searchChanged(address) {
    this.address = address;
  }
}
