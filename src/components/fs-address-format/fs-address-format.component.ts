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
export class FsAddressFormatComponent implements OnInit, DoCheck {

  @Input()
  set address(address) {
    this._address = address;
    if (!this._addressDiffer && address) {
      this._addressDiffer = this._differs.find(address).create();
    }
  }

  get address() {
    return this._address;
  }

  @Input() config: IFsAddressFormatConfig = {};
  @Output() change = new EventEmitter<any>();

  private _address: FsAddress = {};
  private _addressDiffer = null;

  public formattedAddress: any[] = [];

  constructor(private _differs: KeyValueDiffers) { }

  ngOnInit() {
    this.initAddress();
    this.initConfig();
    this.changeFormattedAddress();
  }

  ngDoCheck() {
    if (this._addressDiffer) {

      const changes = this._addressDiffer.diff(this.address);
      if (changes) {
        this.changeFormattedAddress();
        this.change.emit(this.formattedAddress);
      }
    }
  }

  private initAddress() {
    this.address = Object.assign({
      name: null,
      country: {},
      state: {},
      region: {},
      address: null,
      city: null,
      zip: null,
      lat: null,
      lng: null,
    }, this.address);
  }

  private initConfig() {
    this.config = Object.assign({
      isLongFormat: false,
      country: true,
      state: true,
      city: true,
      address: true,
      zip: true,
    }, this.config);
  }

  private changeFormattedAddress() {
    this.formattedAddress.length = 0;

    for (const key in this.config) {
      if (this.config[key] && this.address[key] && this.address[key]) {
        if (this.address[key] instanceof Object) {
          if (Object.keys(this.address[key]).length !== 0) {
            this.config.isLongFormat
              ? this.formattedAddress.push(this.address[key].longName)
              : this.formattedAddress.push(this.address[key].shortName)
          }
        } else {
          if (!!this.address[key]) {
            this.formattedAddress.push(this.address[key]);
          }
        }
      }
    }
  }
}
