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

  @Input() format: 'oneline' | 'twoline';
  @Input() includeFirst: 0;
  @Input() disabled = false;

  public lines: any[] = [];
  public empty = false;

  constructor() {}

  ngOnChanges(changes) {
    if (changes.address && changes.address.previousValue) {
      this.updateView();
    }
  }

  ngOnInit() {
    this.updateView();
  }

  private updateView() {

    const parts = ['name', 'street', 'city', 'region', 'zip', 'country'];
    let address = [];
    this.lines = [];

    if (this.address) {
      each(parts, (part) => {
        if (this.address[part]) {
          address.push(this.address[part]);
        }
      });
    }

    if (this.includeFirst) {
      address = address.slice(0, this.includeFirst);
    }

    this.empty = !address.length;

    if (!this.empty) {

      this.lines = [address];

      if (this.format === 'twoline') {
        this.lines = [[address.shift()]];
        this.lines.push(address);
      }
    }
  }
}
