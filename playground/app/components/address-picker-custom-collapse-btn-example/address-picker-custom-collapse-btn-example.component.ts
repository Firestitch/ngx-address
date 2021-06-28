import {
  Component,
  ViewChild
} from '@angular/core';

import { FsAddressFormatComponent, FsAddressSearchComponent } from '@firestitch/address';

// Interfaces
import {
  FsAddress,
  FsAddressConfig
} from '@firestitch/address';


@Component({
  selector: 'address-picker-custom-collapse-btn-example',
  templateUrl: 'address-picker-custom-collapse-btn-example.component.html',
  styles: []
})
export class AddressPickerCustomCollapseBtnComponent {

  public address: FsAddress = {};
  public config: FsAddressConfig = {
    map: { zoom: 15 },
    collapseButton: { title: 'Show search view', color: 'warn', theme: 'mat-stroked-button' }
  };

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}

  public changed(address) {
    this.address = address;
  }
}
