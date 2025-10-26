import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  AddressFormat,
  FsAddress,
  FsAddressConfig,
} from '@firestitch/address';
import { FormsModule } from '@angular/forms';
import { FsAddressPickerComponent } from '../../../../src/app/components/address-picker/address-picker.component';
import { FsAddressFormatComponent } from '../../../../src/app/components/address-format/address-format.component';


@Component({
    selector: 'address-picker-no-validation-twoline-example',
    templateUrl: './address-picker-no-validation-twoline-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsAddressPickerComponent,
        FsAddressFormatComponent,
    ],
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
