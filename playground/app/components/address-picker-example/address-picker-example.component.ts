import { Component, OnInit } from '@angular/core';

// Interfaces
import { IFsAddressConfig } from '../../../../src/interfaces/address-config.interface';
import { FsAddress } from '../../../../src/interfaces/address.interface';
import { IFsAddressMapOptions } from '../../../../src/interfaces/address-map-options.interface';

@Component({
  selector: 'address-picker-example',
  templateUrl: 'address-picker-example.component.html',
  styles: []
})
export class AddressPickerExampleComponent implements OnInit {

  public address: FsAddress = {};

  public config: IFsAddressConfig = {
    country: { required: true, isVisible: true, showOnly: ['CA', 'US'] },
    state: { required: true, isVisible: true },
    region: { required: true, isVisible: true },
    city: { required: true, isVisible: true },
    address: { required: true, isVisible: true },
    zip: { required: true, isVisible: true },
  };

  public mapOptions: IFsAddressMapOptions = {
    zoom: 15
  };

  constructor() {}

  public ngOnInit() {}

  public select(event) {
    console.log(event);
  }

}
