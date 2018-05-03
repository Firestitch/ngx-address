import { Component } from '@angular/core';

// Interfaces
import { FsAddress } from '../../../../src/interfaces/address.interface';
import { IFsAddressConfig } from '../../../../src/interfaces/address-config.interface';
import { IFsAddressMapConfig } from '../../../../src/interfaces/address-map-config.interface';
import { IFsAddressFormatConfig } from '../../../../src/interfaces/address-format-config.interface';

@Component({
  selector: 'full-address-example',
  templateUrl: 'full-address-example.component.html'
})
export class FullAddressExampleComponent {

  public address: FsAddress = {};

  public config: IFsAddressConfig = {
    name: { required: false, visible: true },
    country: { required: true, visible: true, list: ['CA', 'US'] },
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

  public changed(event) {
    console.log('Changed', event);
    this.address = event;
  }

  public changeFormat(event) {
    console.log('Parts', event);
  }
}
