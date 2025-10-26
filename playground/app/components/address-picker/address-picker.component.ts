import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

// Interfaces
import {
  AddressFormat,
  FsAddress,
  FsAddressFormatComponent,
  FsAddressPickerComponent,
  FsAddressPickerConfig,
} from '@firestitch/address';
import { FsMessage } from '@firestitch/message';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsAddressPickerComponent as FsAddressPickerComponent_1 } from '../../../../src/app/components/address-picker/address-picker.component';
import { MatButton } from '@angular/material/button';
import { FsAddressFormatComponent as FsAddressFormatComponent_1 } from '../../../../src/app/components/address-format/address-format.component';


@Component({
    selector: 'address-picker',
    templateUrl: './address-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        FsAddressPickerComponent_1,
        MatButton,
        FsAddressFormatComponent_1,
    ],
})
export class AddressPickerComponent {

  public view = '';
  public address: FsAddress = { address2: 'address2', address3: 'address3' };
  public config: FsAddressPickerConfig = {
    label: 'Location',
    hint: 'Hint Hint Hint Hint Hint...',
    format: AddressFormat.TwoLine,
    map: { zoom: 15, showMap: true },
    name: { visible: false, required: false, disabled: false },
    address2: { visible: true, required: true, disabled: false },
    address3: { visible: true, required: false, disabled: false },
    street: { visible: true, required: true, disabled: false },
    city: { visible: true, required: true, disabled: false },
    region: { visible: true, required: true, disabled: false },
    zip: { visible: true, required: true, disabled: false },
    country: { visible: true, required: true, disabled: false },
    lat: { visible: true, required: true, disabled: false },
    lng: { visible: true, required: true, disabled: false },
  };

  @ViewChild(FsAddressFormatComponent)
  public format: FsAddressFormatComponent;

  @ViewChild(FsAddressPickerComponent)
  public addressPicker: FsAddressPickerComponent;

  constructor(
    private _message: FsMessage,
  ) {
  }

  public changed(address) {
    this.address = address;
  }

  public submit() {
    this._message.success('Saved');
  }
}
