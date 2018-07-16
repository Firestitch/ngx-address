import {
  Component,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig
} from '../../../../src/interfaces';

import { FsAddressPickerComponent, FsAddressFormatComponent } from '../../../../src';


@Component({
  selector: 'address-picker-custom-collapse-btn-example',
  templateUrl: 'address-picker-custom-collapse-btn-example.component.html',
  styles: []
})
export class AddressPickerCustomCollapseBtnComponent {

  public address: FsAddress = {};
  public config: IFsAddressConfig = {
    map: { zoom: 15 },
    collapseButton: { title: 'Show search view', color: 'warn', theme: 'mat-stroked-button' }
  };

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}

  public changed(address) {
    this.address = address;
  }
}
