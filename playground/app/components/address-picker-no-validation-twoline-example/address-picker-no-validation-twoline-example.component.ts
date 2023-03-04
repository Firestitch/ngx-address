import {
  Component,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress, FsAddressSearchComponent,
  FsAddressConfig,
  AddressFormat
} from '@firestitch/address';

import { FsAddressFormatComponent } from '@firestitch/address';


@Component({
  selector: 'address-picker-no-validation-twoline-example',
  templateUrl: './address-picker-no-validation-twoline-example.component.html',
})
export class AddressPickerNoValidationTwolineExampleComponent {

  public address: FsAddress = {};
  public AddressFormat = AddressFormat;
  public config: FsAddressConfig = {
    map: { zoom: 15 }
  };

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}

  public changed(address) {
    this.address = address;
  }
}
