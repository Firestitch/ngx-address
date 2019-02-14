import {
  Component,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig
} from '@firestitch/address';

import { FsAddressFormatComponent } from '@firestitch/address';


@Component({
  selector: 'address-picker-no-validation-example',
  templateUrl: 'address-picker-no-validation-example.component.html',
  styles: []
})
export class AddressPickerNoValidationExampleComponent {

  public view = '';
  public address: FsAddress = {};
  public config: IFsAddressConfig = {
    map: { zoom: 15 }
  };

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {

    setTimeout(() => {
      this.address = null;;
    },1000)

  }

  public changed(address) {
    this.address = address;
  }
}
