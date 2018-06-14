import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig,
} from '../../../../src/interfaces';

import { FsAddressPickerComponent, FsAddressFormatComponent } from '../../../../src';

@Component({
  selector: 'address-picker-pre-filled-example',
  templateUrl: 'address-picker-pre-filled-example.component.html',
  styles: []
})
export class AddressPickerPreFilledExampleComponent implements OnInit {

  public view = '';
  public address: FsAddress = {
    name: 'CN Tower',
    country: 'CA',
    region: 'ON',
    city: 'Toronto',
    street: '301 Front Street West',
    zip: 'M5V 2T6'
  };
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
