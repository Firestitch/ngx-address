import { Component, ViewChild } from '@angular/core';

// Interfaces
import {
  FsAddress, FsAddressSearchComponent,
  IFsAddressConfig,
} from '@firestitch/address';

import {  FsAddressFormatComponent } from '@firestitch/address';

@Component({
  selector: 'address-picker-no-validation-summary-example',
  templateUrl: 'address-picker-no-validation-summary-example.component.html',
  styles: []
})
export class AddressPickerNoValidationSummaryExampleComponent {

  public address: FsAddress = {};
  public config: IFsAddressConfig = {
    map: { zoom: 15 }
  };

  @ViewChild('format', { static: false }) format: FsAddressFormatComponent;

  constructor() {}
}
