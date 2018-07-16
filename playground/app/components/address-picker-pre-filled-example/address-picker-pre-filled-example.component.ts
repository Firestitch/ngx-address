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

  public address: FsAddress = {
    name: 'CN Tower',
    country: 'CA',
    region: 'ON',
    city: 'Toronto',
    street: '301 Front Street West',
    zip: 'M5V 2T6'
  };

  public config: IFsAddressConfig = {};

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}

  public ngOnInit() {}
}
