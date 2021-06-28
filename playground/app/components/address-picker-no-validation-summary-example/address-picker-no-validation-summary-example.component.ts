import { Component, ViewChild } from '@angular/core';

// Interfaces
import {
  FsAddress, FsAddressSearchComponent,
  FsAddressConfig,
} from '@firestitch/address';

import {  FsAddressFormatComponent } from '@firestitch/address';

@Component({
  selector: 'address-picker-no-validation-summary-example',
  templateUrl: 'address-picker-no-validation-summary-example.component.html',
  styles: []
})
export class AddressPickerNoValidationSummaryExampleComponent {

  public address: FsAddress = {};
  public config: FsAddressConfig = {
    map: { zoom: 15 }
  };

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}
}
