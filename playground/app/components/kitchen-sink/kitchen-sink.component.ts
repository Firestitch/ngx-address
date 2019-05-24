import {
  Component,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  AddressFormat
} from '@firestitch/address';

import { FsAddressFormatComponent, AddressPickerConfig  } from '@firestitch/address';
import { FsExampleComponent } from '@firestitch/example';
import { ConfigureComponent } from '../configure';
import { FsMessage } from '@firestitch/message';


@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styles: []
})
export class KitchenSinkComponent {

  public view = '';
  public address: FsAddress = {};
  public config: AddressPickerConfig = {
    label: 'Location',
    format: AddressFormat.OneLine,
    map: { zoom: 15 },
    name: { visible: true, required: false, disabled: false },
    address2:  { visible: true, required: false, disabled: false },
    street:  { visible: true, required: false, disabled: false },
    city:  { visible: true, required: false, disabled: false },
    region:  { visible: true, required: false, disabled: false },
    zip:  { visible: true, required: false, disabled: false },
    country:  { visible: true, required: false, disabled: false }
  };

  @ViewChild('format') format: FsAddressFormatComponent;

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
