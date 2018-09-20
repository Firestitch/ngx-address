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
import { FsAddressComponent } from '../fs-address/fs-address.component';


@Component({
  selector: 'fs-address-picker',
  templateUrl: './fs-address-picker.component.html',
  styleUrls: ['./fs-address-picker.component.scss'],
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
