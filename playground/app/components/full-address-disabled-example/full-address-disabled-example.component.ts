import { Component } from '@angular/core';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig,
  IFsAddressFormatConfig
} from '../../../../src/interfaces';


@Component({
  selector: 'full-address-disabled-example',
  templateUrl: 'full-address-disabled-example.component.html'
})
export class FullAddressDisabledExampleComponent {

  public address: FsAddress = {};

  public config: IFsAddressConfig = {
    name: { required: false, visible: true, disabled: true },
    country: { required: true, visible: true, disabled: true },
    region: { required: true, visible: true, disabled: true },
    city: { required: true, visible: true, disabled: true },
    street: { required: true, visible: true, disabled: true },
    zip: { required: true, visible: true, disabled: true },
    map: {}
  };

  public addressFormatConfig: IFsAddressFormatConfig = {
    city: false,
  };

  constructor() { }
}
