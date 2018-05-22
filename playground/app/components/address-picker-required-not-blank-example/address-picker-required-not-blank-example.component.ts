import { Component, OnInit, ViewChild } from '@angular/core';

// Interfaces
import { IFsAddressConfig } from '../../../../src/interfaces/address-config.interface';
import { FsAddress } from '../../../../src/interfaces/address.interface';
import { IFsAddressFormatConfig } from '../../../../src/interfaces/address-format-config.interface';

// Others
import { FsAddressPickerComponent } from '../../../../src/components/fs-address-picker/fs-address-picker.component';

@Component({
  selector: 'address-picker-required-not-blank-example',
  templateUrl: 'address-picker-required-not-blank-example.component.html',
  styles: []
})
export class AddressPickerRequiredNotBlankExampleComponent implements OnInit {

  public address: FsAddress = {};
  public config: IFsAddressConfig = {
    country: { required: true, visible: true },
    region: { required: true, visible: true },
    city: { required: false, visible: true },
    street: { required: false, visible: true },
    zip: { required: false, visible: true },
    map: { zoom: 15 }
  };
  public addressFormatConfig: IFsAddressFormatConfig = {};

  @ViewChild('picker') picker: FsAddressPickerComponent;

  constructor() {}

  public ngOnInit() {}

  public changeAddress(event) {
    console.log('Picker: Required (not blank) select', event);
    this.address = event;
  }

  public closeEdit() {
    this.picker.closeEdit()
  }

}
