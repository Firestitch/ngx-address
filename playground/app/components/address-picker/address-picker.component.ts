import {
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  AddressFormat, 
  FsAddressPickerComponent
} from '@firestitch/address';
import { FsMessage } from '@firestitch/message';
import { FsAddressFormatComponent, FsAddressPickerConfig  } from '@firestitch/address';
import { FsExampleComponent } from '@firestitch/example';

import { ConfigureComponent } from '../configure';


@Component({
  selector: 'address-picker',
  templateUrl: 'address-picker.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressPickerComponent {

  public view = '';
  public address: FsAddress;
  public config: FsAddressPickerConfig = {
    label: 'Location',
    hint: 'Hint Hint Hint Hint Hint...',
    format: AddressFormat.TwoLine,
    map: { zoom: 15, showMap: true },
    name: { visible: false, required: false, disabled: false },
    address2:  { visible: true, required: false, disabled: false },
    address3:  { visible: true, required: false, disabled: false },
    street:  { visible: true, required: false, disabled: false },
    city:  { visible: true, required: true, disabled: false },
    region:  { visible: true, required: true, disabled: false },
    zip:  { visible: true, required: false, disabled: false },
    country:  { visible: true, required: true, disabled: false }
  };

  @ViewChild(FsAddressFormatComponent)
  public format: FsAddressFormatComponent;

  @ViewChild(FsAddressPickerComponent)
  public addressPicker: FsAddressPickerComponent;

  constructor(
    private example: FsExampleComponent, 
    private message: FsMessage,
  ) {
    example.setConfigureComponent(ConfigureComponent, { config: this.config });
  }

  public changed(address) {
    this.address = address;
  }

  public submit() {
    this.message.success('Saved');
  }
}