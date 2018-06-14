import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig,
  IFsAddressFormatConfig
} from '../../../../src/interfaces';

import { FsAddressPickerComponent, FsAddressFormatComponent } from '../../../../src';

@Component({
  selector: 'address-picker-required-not-blank-example',
  templateUrl: 'address-picker-required-not-blank-example.component.html',
  styles: []
})
export class AddressPickerRequiredNotBlankExampleComponent implements OnInit {

  public view = '';
  public address: FsAddress = {
    name: 'CN Tower',
    street: '301 Front St W',
    city: 'Toronto',
    region: 'ON',
    zip: 'M5V 2T6',
    country: 'CA'
  };

  public config: IFsAddressConfig = {
    country: { required: true },
    region: { required: true },
    city: { required: true },
    street: { required: true },
    zip: { required: true }
  };

  @ViewChild('picker') picker: FsAddressPickerComponent;
  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}

  public ngOnInit() {}

  public viewSearch() {
    this.picker.viewSearch()
  }

  public changed(address) {
    this.address = address;
  }
}
