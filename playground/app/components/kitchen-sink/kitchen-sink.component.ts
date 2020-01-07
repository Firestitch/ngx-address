import {
  Component,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  AddressFormat, FsAddressSearchComponent
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
    map: { zoom: 15, showMap: true },
    name: { visible: false, required: false, disabled: false },
    address2:  { visible: true, required: false, disabled: false },
    street:  { visible: true, required: false, disabled: false },
    city:  { visible: true, required: true, disabled: false },
    region:  { visible: true, required: true, disabled: false },
    zip:  { visible: true, required: false, disabled: false },
    country:  { visible: true, required: true, disabled: false }
  };

  @ViewChild('format', { static: false }) format: FsAddressFormatComponent;

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
