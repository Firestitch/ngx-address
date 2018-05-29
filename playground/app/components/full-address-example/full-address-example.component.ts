import { Component } from '@angular/core';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig,
  IFsAddressFormatConfig
} from '../../../../src/interfaces';


@Component({
  selector: 'full-address-example',
  templateUrl: 'full-address-example.component.html'
})
export class FullAddressExampleComponent {

  public address: FsAddress = {};

  public config: IFsAddressConfig = {
    name: { required: false, visible: true },
    country: { required: true, visible: true },
    region: { required: true, visible: true },
    city: { required: true, visible: true },
    street: { required: true, visible: true },
    zip: { required: true, visible: true },
    map: {}
  };

  public addressFormatConfig: IFsAddressFormatConfig = {
    city: false,
  };

  constructor() { }
}
