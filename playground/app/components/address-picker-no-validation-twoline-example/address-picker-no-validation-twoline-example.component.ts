import {
  Component,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig
} from '../../../../src/interfaces';

import { FsAddressPickerComponent, FsAddressFormatComponent } from '../../../../src';


@Component({
  selector: 'address-picker-no-validation-twoline-example',
  templateUrl: 'address-picker-no-validation-twoline-example.component.html',
  styles: []
})
export class AddressPickerNoValidationTwolineExampleComponent {

  public view = '';
  public address: FsAddress = {};
  public config: IFsAddressConfig = {
    country: { required: false, visible: true },
    region: { required: false, visible: true },
    city: { required: false, visible: true },
    street: { required: false, visible: true },
    zip: { required: false, visible: true },
    map: { zoom: 15 }
  };

  @ViewChild('picker') picker: FsAddressPickerComponent;
  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}

  public viewSearch() {
    this.picker.viewSearch();
  }

  public changed(address) {
    this.address = address;
  }
}
