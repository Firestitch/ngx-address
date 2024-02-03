import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  AddressFormat, FsAddress,
  FsAddressConfig,
} from '@firestitch/address';


@Component({
  selector: 'address-disabled-or-readonly-example',
  templateUrl: './address-disabled-or-readonly-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressDisabledOrReadonlyExampleComponent {

  public address: FsAddress = {
    name: 'CN Tower',
    country: 'CA',
    region: 'ON',
    city: 'Toronto',
    street: '301 Front Street West',
    zip: 'M5V 2T6',
  };

  public config: FsAddressConfig = {};
  public AddressFormat = AddressFormat;

}
