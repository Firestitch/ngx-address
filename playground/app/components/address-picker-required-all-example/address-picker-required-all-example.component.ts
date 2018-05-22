import { Component, OnInit, ViewChild } from '@angular/core';

// Interfaces
import { IFsAddressConfig } from '../../../../src/interfaces/address-config.interface';
import { FsAddress } from '../../../../src/interfaces/address.interface';
import { IFsAddressFormatConfig } from '../../../../src/interfaces/address-format-config.interface';

// Others
import { FsAddressPickerComponent } from '../../../../src/components/fs-address-picker/fs-address-picker.component';

@Component({
  selector: 'address-picker-required-all-example',
  templateUrl: 'address-picker-required-all-example.component.html',
  styles: []
})
export class AddressPickerRequiredAllExampleComponent implements OnInit {

  public address: FsAddress = {};
  public config: IFsAddressConfig = {
    country: { required: true, visible: true },
    region: { required: true, visible: true },
    city: { required: true, visible: true },
    street: { required: true, visible: true },
    zip: { required: true, visible: true },
    map: { zoom: 15 }
  };
  public addressFormatConfig: IFsAddressFormatConfig = {};

  @ViewChild('picker') picker: FsAddressPickerComponent;

  constructor() {}

  public ngOnInit() {}

  public changeAddress(event) {
    console.log('Picker: All fields required', event);
    this.address = event;
  }

  public closeEdit() {
    this.picker.closeEdit()
  }

}
