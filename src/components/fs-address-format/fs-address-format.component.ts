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
      name: void 0,
      country: {},
      region: {},
      city: void 0,
      street: void 0,
      zip: void 0,
      lat: null,
      lng: null,
    }, this.address);
  }

  private initConfig() {
    this.config = Object.assign({
      isLongFormat: false,
      country: true,
      region: true,
      city: true,
      street: true,
      zip: true,
    }, this.config);
  }

  private changeFormattedAddress() {
    this.formattedAddress.length = 0;

    if (this.config.country && this.address.country && this.address.country.longName) {
      this.formattedAddress.push(
        this.config.isLongFormat ? this.address.country.longName : this.address.country.shortName
      )
    }

    let regionZip = '';
    if (this.config.region && this.address.region && this.address.region.longName) {
      regionZip += this.config.isLongFormat ? this.address.region.longName : this.address.region.shortName
    }

    if (this.config.zip && this.address.zip) {
      regionZip += ' ' + this.address.zip;
    }

    if (regionZip) {
      this.formattedAddress.push(regionZip);
    }

    if (this.config.city && this.address.city) {
      this.formattedAddress.push(this.address.city);
    }

    if (this.config.street && this.address.street) {
      this.formattedAddress.push(this.address.street);
    }
  }
}
