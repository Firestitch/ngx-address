import { Component, OnInit, ViewChild } from '@angular/core';

// Interfaces
import { IFsAddressConfig } from '../../../../src/interfaces/address-config.interface';
import { FsAddress } from '../../../../src/interfaces/address.interface';
import { IFsAddressFormatConfig } from '../../../../src/interfaces/address-format-config.interface';

// Others
import { FsAddressPickerComponent } from '../../../../src/components/fs-address-picker/fs-address-picker.component';

@Component({
  selector: 'address-picker-example',
  templateUrl: 'address-picker-example.component.html',
  styles: []
})
export class AddressPickerExampleComponent implements OnInit {

  public address: FsAddress = {};

  public config: IFsAddressConfig = {
    country: { required: true, visible: true, list: ['CA', 'US'] },
    region: { required: true, visible: true },
    city: { required: true, visible: true },
    street: { required: true, visible: true },
    zip: { required: true, visible: true },
    map: { zoom: 15 }
  };

  public addressFormatConfig: IFsAddressFormatConfig = {
  };

  @ViewChild('picker') picker: FsAddressPickerComponent;

  constructor() {}

  public ngOnInit() {}

  public change(event) {
    console.log('Address select', event);
    this.address = event;
  }

  public changeFormat(event) {
    console.log('Change format', event);
  }

  public closeEdit() {
    this.picker.closeEdit()
  }

}
