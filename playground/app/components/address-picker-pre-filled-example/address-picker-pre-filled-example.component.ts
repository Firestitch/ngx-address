import {
  Component,
  ViewChild
} from '@angular/core';

import {
  AddressFormat,
  FsAddress, 
  FsAddressConfig,
} from '@firestitch/address';

import { FsAddressFormatComponent } from '@firestitch/address';

@Component({
  selector: 'address-picker-pre-filled-example',
  templateUrl: './address-picker-pre-filled-example.component.html',
})
export class AddressPickerPreFilledExampleComponent {

  public address: FsAddress = {
    name: 'CN Tower',
    country: 'CA',
    region: 'ON',
    city: 'Toronto',
    street: '301 Front Street West',
    zip: 'M5V 2T6'
  };

  public config: FsAddressConfig = { };
  public AddressFormat = AddressFormat;

  @ViewChild('format') format: FsAddressFormatComponent;

}
