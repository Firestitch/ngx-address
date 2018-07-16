import {Component, OnInit, ViewChild} from '@angular/core';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig,
} from '../../../../src/interfaces';

import { FsAddressFormatComponent } from '../../../../src';


@Component({
  selector: 'address-disabled-or-readonly-example',
  templateUrl: 'address-disabled-or-readonly-example.component.html'
})
export class AddressDisabledOrReadonlyExampleComponent implements OnInit {

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
