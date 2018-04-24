import { Component } from '@angular/core';
import { FsAddress } from '../../../../src/interfaces/address.interface';
import { IFsAddressConfig } from '../../../../src/interfaces/address-config.interface';
import { IFsAddressMapOptions } from '../../../../src/interfaces/address-map-options.interface';
import { IFsAddressFormatConfig } from '../../../../src/interfaces/address-format-config.interface';

@Component({
  selector: 'first-example',
  templateUrl: 'first-example.component.html'
})
export class FirstExampleComponent {

  public parts = [];

  public address: FsAddress = {};

  public config: IFsAddressConfig = {
    country: { required: true, isVisible: true, showOnly: ['CA', 'US'] },
    state: { required: true, isVisible: true },
    region: { required: true, isVisible: true },
    city: { required: true, isVisible: true },
    address: { required: true, isVisible: true },
    zip: { required: true, isVisible: true },
  };

  public mapOptions: IFsAddressMapOptions = {};

  public addressFormatConfig: IFsAddressFormatConfig = {
    city: false,
  };

  constructor() { }

  public select(event) {
    console.log('Changed', event);
    this.address = event;
  }

  public changeFormat(event) {
    console.log('parts', event);

    this.parts = event;
  }
}
