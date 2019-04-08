import {
  Component,
  ViewChild
} from '@angular/core';

import { FsAddressFormatComponent } from '@firestitch/address';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig
} from '@firestitch/address';


@Component({
  selector: 'address-picker-custom-collapse-label-example',
  templateUrl: 'address-picker-custom-collapse-label-example.component.html',
  styles: []
})
export class AddressPickerCustomCollapseLabelComponent {

  public address: FsAddress = {};
  public config: IFsAddressConfig = {
    label: 'Mailing Address',
    map: { zoom: 15 },
    collapseButton: { title: 'Show search view', color: 'warn', theme: 'mat-stroked-button' }
  };

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}

  public changed(address) {
    this.address = address;
  }
}