import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

// Interfaces
import { FsAddress, FsAddressSearchComponent, FsAddressConfig, AddressFormat, } from '@firestitch/address';

import { FsAddressFormatComponent } from '@firestitch/address';

@Component({
  selector: 'address-picker-required-not-blank-example',
  templateUrl: './address-picker-required-not-blank-example.component.html',
  styles: []
})
export class AddressPickerRequiredNotBlankExampleComponent implements OnInit {

  public address: FsAddress = {};
  public AddressFormat = AddressFormat;

  public config: FsAddressConfig = {
    country: { required: true },
    region: { required: true },
    city: { required: true },
    street: { required: true },
    zip: { required: true }
  };

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}

  public ngOnInit() {}
}
