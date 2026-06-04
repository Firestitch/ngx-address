import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

// Interfaces
import { FormsModule } from '@angular/forms';

import {
  AddressFormat,
  FsAddress,
  FsAddressFormatComponent,
  FsAddressPickerComponent,
  FsAddressPickerConfig,
} from '@firestitch/address';

import { FsAddressFormatComponent as FsAddressFormatComponent_1 } from '../../../../src/app/components/address-format/address-format.component';
import { FsAddressPickerComponent as FsAddressPickerComponent_1 } from '../../../../src/app/components/address-picker/address-picker.component';


@Component({
  selector: 'address-picker',
  templateUrl: './address-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    FsAddressPickerComponent_1,
    FsAddressFormatComponent_1,
  ],
})
export class AddressPickerComponent {

  public view = '';
  public address: FsAddress = {
    name: 'CN Tower',
    country: 'CA',
    region: 'ON',
    city: 'Toronto',
    street: '301 Front Street West',
    zip: 'M5V 2T6',
  };

  public config: FsAddressPickerConfig = {
    label: 'Location',
    hint: 'Hint Hint Hint Hint Hint...',
    format: AddressFormat.TwoLine,
    map: { zoom: 15, showMap: true },
    name: { visible: false },
    address2: { visible: true },
    address3: { visible: true },
    street: { visible: true, required: true },
    city: { visible: true, required: true },
    region: { visible: true, required: true },
    zip: { visible: true, required: true },
    country: { visible: true, required: true },
    lat: { visible: true, required: true },
    lng: { visible: true, required: true },
  };

  @ViewChild(FsAddressFormatComponent)
  public format: FsAddressFormatComponent;

  @ViewChild(FsAddressPickerComponent)
  public addressPicker: FsAddressPickerComponent;

  public changed(address) {
    this.address = address;
  }
}
