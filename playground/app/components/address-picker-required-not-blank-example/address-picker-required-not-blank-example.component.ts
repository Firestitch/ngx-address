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
  public address: FsAddress = {};
  public config: IFsAddressConfig = {
    country: { required: true, visible: true },
    region: { required: true, visible: true },
    city: { required: false, visible: true },
    street: { required: false, visible: true },
    zip: { required: false, visible: true },
    map: { zoom: 15 }
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
