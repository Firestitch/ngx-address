import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  AddressFormat,
  FsAddress,
  FsAddressConfig,
} from '@firestitch/address';


@Component({
  selector: 'address-picker-no-validation-twoline-example',
  templateUrl: './address-picker-no-validation-twoline-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressPickerNoValidationTwolineExampleComponent {

  public address: FsAddress = {};
  public AddressFormat = AddressFormat;
  public config: FsAddressConfig = {
    map: { zoom: 15 },
  };

  public changed(address) {
    this.address = address;
  }
}
