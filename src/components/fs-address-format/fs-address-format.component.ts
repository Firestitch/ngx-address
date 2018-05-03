import {
  Component,
  Input,
  Output,
  EventEmitter,
  KeyValueDiffers,
  OnInit,
  DoCheck
} from '@angular/core';
import {
  each,
  isArrayLikeObject
} from 'lodash';

import { FsAddress } from '../../interfaces/address.interface';
import { IFsAddressFormatConfig } from '../../interfaces/address-format-config.interface';


@Component({
  selector: 'fs-address-format',
  templateUrl: './fs-address-format.component.html',
  styleUrls: ['./fs-address-format.component.scss']
})
export class FsAddressFormatComponent implements OnInit {

  @Input()
  set address(address) {
    this._address = address;
  }

  get address() {
    return this._address;
  }

  @Input() config: IFsAddressFormatConfig = {};

  private _address: FsAddress = {};

  constructor() { }

  ngOnInit() {
    this.initAddress();
    this.initConfig();
  }

  private initAddress() {
    this.address = Object.assign({
      name: void 0,
      country: void 0,
      region: void 0,
      city: void 0,
      street: void 0,
      zip: void 0,
      lat: null,
      lng: null,
    }, this.address);
  }

  private initConfig() {
    this.config = Object.assign({
      country: true,
      region: true,
      city: true,
      street: true,
      zip: true,
    }, this.config);
  }
}
