import { Component, ViewChild } from '@angular/core';

// Interfaces
import {
  AddressFormat,
  FsAddress, 
  FsAddressConfig,
} from '@firestitch/address';

import {  FsAddressFormatComponent } from '@firestitch/address';

@Component({
  selector: 'address-picker-no-validation-summary-example',
  templateUrl: './address-picker-no-validation-summary-example.component.html',
})
export class AddressPickerNoValidationSummaryExampleComponent {

  public address: FsAddress = {};
  public AddressFormat = AddressFormat;
  public config: FsAddressConfig = {
    map: { zoom: 15 }
  };

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}
}
