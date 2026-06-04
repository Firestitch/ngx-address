import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AddressFormat,
  FsAddress,
  FsAddressConfig,
} from '@firestitch/address';

import { FsAddressFormatComponent } from '../../../../src/app/components/address-format/address-format.component';
import { FsAddressPickerComponent } from '../../../../src/app/components/address-picker/address-picker.component';

@Component({
  selector: 'address-picker-pre-filled-example',
  templateUrl: './address-picker-pre-filled-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    FsAddressPickerComponent,
    FsAddressFormatComponent,
  ],
})
export class AddressPickerPreFilledExampleComponent {

  public address: FsAddress = {
    name: 'CN Tower',
    country: 'CA',
    region: 'ON',
    city: 'Toronto',
    street: '301 Front Street West',
    zip: 'M5V 2T6',
  };

  public config: FsAddressConfig = { label: 'Address' };
  public AddressFormat = AddressFormat;
}
