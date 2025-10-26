import {
  Component,
} from '@angular/core';

// Interfaces
import { AddressFormat, FsAddress, FsAddressConfig } from '@firestitch/address';
import { FormsModule } from '@angular/forms';
import { FsAddressPickerComponent } from '../../../../src/app/components/address-picker/address-picker.component';
import { FsAddressFormatComponent } from '../../../../src/app/components/address-format/address-format.component';

@Component({
    selector: 'address-picker-required-not-blank-example',
    templateUrl: './address-picker-required-not-blank-example.component.html',
    styles: [],
    standalone: true,
    imports: [
        FormsModule,
        FsAddressPickerComponent,
        FsAddressFormatComponent,
    ],
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
