import {
  Component,
} from '@angular/core';

// Interfaces
import { AddressFormat, FsAddress, FsAddressConfig } from '@firestitch/address';

@Component({
  selector: 'address-picker-required-not-blank-example',
  templateUrl: './address-picker-required-not-blank-example.component.html',
  styles: [],
})
export class AddressPickerRequiredNotBlankExampleComponent {

  public address: FsAddress = {};
  public AddressFormat = AddressFormat;

  public config: FsAddressConfig = {
    country: { required: true },
    region: { required: true },
    city: { required: true },
    street: { required: true },
    zip: { required: true },
  };
}
