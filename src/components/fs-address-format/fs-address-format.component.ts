import {
  Component,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import {
  each,
  isArrayLikeObject
} from 'lodash';
import {
  FsAddress,
  IFsAddressFormatConfig
} from '../../interfaces';


@Component({
  selector: 'fs-address-format',
  templateUrl: './fs-address-format.component.html',
  styleUrls: ['./fs-address-format.component.scss']
})
export class FsAddressFormatComponent implements OnInit, OnChanges {

  private _address: FsAddress = {};
  @Input()
  set address(address) {
    this._address = address;
  }
  get address() {
    return this._address;
  }
  @Input() config: IFsAddressFormatConfig = {};

  public shortName: string;
  public formattedAddress: any[] = [];

  private _orderList: string[];
  private _defaultOrderList = ['name', 'street', 'city', 'region', 'zip', 'country'];

  constructor() {}

  ngOnChanges(changes) {
    if (changes.address && changes.address.previousValue) {
      this.updateView();
    }
  }

  ngOnInit() {
    this.initAddress();
    this.initConfig();
    this.updateView();
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
      name: true,
      country: true,
      region: true,
      city: true,
      street: true,
      zip: true,
      isShort: false,
      linesCount: 1,
    }, this.config);
  }

  private updateView() {
    if (this.config.isShort) {
      if (this.config.name && this.address.name && this.address.name !== '') {
        this.shortName = this.address.name;
      } else if (this.config.street && this.address.street && this.address.street !== '') {
        this.shortName = this.address.street;
      } else if (this.config.city && this.address.city && this.address.city !== '') {
        this.shortName = this.address.city;
      } else if (this.config.region && this.address.region && this.address.region !== '') {
        this.shortName = this.address.region;
      } else if (this.config.zip && this.address.zip && this.address.zip !== '') {
        this.shortName = this.address.zip;
      } else if (this.config.country && this.address.country && this.address.country !== '') {
        this.shortName = this.address.country;
      } else {
        this.shortName = '';
      }
    } else {
      this.formattedAddress.length = 0;

      this._orderList = this._defaultOrderList.slice();

      for (let i = 0; i < this.config.linesCount - 1; i++) {
        let fieldName = this._orderList.shift();

        while ((!this.config[fieldName] || !this.address[fieldName] || this.address[fieldName] === '') && this._orderList.length) {
          fieldName = this._orderList.shift();
        }

        if (this.config[fieldName] && this.address[fieldName] && this.address[fieldName] !== '') {
          this.formattedAddress.push(this.address[fieldName]);
        }
      }

      const otherValues = [];
      this._orderList.forEach(item => {
        if (this.config[item] && this.address[item] && this.address[item] !== '') {
          otherValues.push(this.address[item]);
        }
      });

      if (otherValues.length) {
        this.formattedAddress.push(otherValues.join(', '));
      }
    }
  }
}
