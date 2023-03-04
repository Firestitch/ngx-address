import {
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  AddressFormat, FsAddressSearchComponent, FsAddressPickerComponent
} from '@firestitch/address';
import { FsMessage } from '@firestitch/message';
import { FsAddressFormatComponent, FsAddressPickerConfig  } from '@firestitch/address';
import { FsExampleComponent } from '@firestitch/example';

import { ConfigureComponent } from '../configure';


@Component({
  selector: 'picker-with-confirmation',
  templateUrl: './picker-with-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerWithConfirmationComponent {

  public view = '';
  public address: FsAddress = {};
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
    country:  { visible: true, required: true, disabled: false },
    confirmation: true,
  };

  @ViewChild(FsAddressFormatComponent)
  public format: FsAddressFormatComponent;

  @ViewChild(FsAddressPickerComponent)
  public addressPicker: FsAddressPickerComponent;

  constructor(private example: FsExampleComponent, private message: FsMessage) {
    example.setConfigureComponent(ConfigureComponent, { config: this.config });
  }

  public changed(address) {
    this.address = address;
  }

  public submit() {
    this.message.success('Saved');
  }
}
