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

  public parts = [];

  public address: FsAddress = {};

  public config: IFsAddressConfig = {
    name: { required: false, isVisible: true },
    country: { required: true, isVisible: true, list: ['CA', 'US'] },
    region: { required: true, isVisible: true },
    city: { required: true, isVisible: true },
    street: { required: true, isVisible: true },
    zip: { required: true, isVisible: true },
    map: {}
  };

  public addressFormatConfig: IFsAddressFormatConfig = {
    city: false,
  };

  constructor() { }

  public select(event) {
    console.log('Changed', event);
    this.address = event;
  }

  public changeFormat(event) {
    console.log('Parts', event);

    this.parts = event && event.slice();
  }
}
