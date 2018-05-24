import { Component, OnInit, ViewChild } from '@angular/core';

// Interfaces
import { IFsAddressConfig } from '../../../../src/interfaces/address-config.interface';
import { FsAddress } from '../../../../src/interfaces/address.interface';
import { IFsAddressFormatConfig } from '../../../../src/interfaces/address-format-config.interface';

// Others
import { FsAddressPickerComponent } from '../../../../src/components/fs-address-picker/fs-address-picker.component';

@Component({
  selector: 'address-picker-map-required-example',
  templateUrl: 'address-picker-map-required-example.component.html',
  styles: []
})
export class AddressPickerMapRequiredExampleComponent implements OnInit {

  public address: FsAddress = {};
  public config: IFsAddressConfig = {
    country: { required: false, visible: true },
    region: { required: false, visible: true },
    city: { required: false, visible: true },
    street: { required: false, visible: true },
    zip: { required: false, visible: true },
    lat: { required: true },
    lng: { required: true },
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
