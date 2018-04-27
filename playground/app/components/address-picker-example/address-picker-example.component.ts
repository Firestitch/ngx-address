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
    country: { required: true, isVisible: true, list: ['CA', 'US'] },
    region: { required: true, isVisible: true },
    city: { required: true, isVisible: true },
    street: { required: true, isVisible: true },
    zip: { required: true, isVisible: true },
    map: { zoom: 15 }
  };

  public parts = [];

  public addressFormatConfig: IFsAddressFormatConfig = {
    city: false,
  };

  @ViewChild('picker') picker: FsAddressPickerComponent;

  constructor() {}

  public ngOnInit() {}

  public select(event) {
    console.log('Address select', event);
  }

  public changeFormat(event) {
    console.log('Change format', event);
  }

  public closeEdit() {
    this.picker.closeEdit()
  }

}
