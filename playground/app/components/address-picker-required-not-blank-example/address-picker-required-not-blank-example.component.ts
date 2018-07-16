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

  public address: FsAddress = {};

  public config: IFsAddressConfig = {
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
