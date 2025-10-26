import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  AddressFormat, FsAddress,
  FsAddressConfig,
} from '@firestitch/address';
import { FormsModule } from '@angular/forms';
import { FsAddressPickerComponent } from '../../../../src/app/components/address-picker/address-picker.component';
import { FsAddressFormatComponent } from '../../../../src/app/components/address-format/address-format.component';


@Component({
    selector: 'address-disabled-or-readonly-example',
    templateUrl: './address-disabled-or-readonly-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsAddressPickerComponent,
        FsAddressFormatComponent,
    ],
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
