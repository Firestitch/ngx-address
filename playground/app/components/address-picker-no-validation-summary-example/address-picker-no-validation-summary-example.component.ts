import { Component, ViewChild } from '@angular/core';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig,
} from '../../../../src/interfaces';

import {  FsAddressFormatComponent } from '../../../../src';

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

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}
}
