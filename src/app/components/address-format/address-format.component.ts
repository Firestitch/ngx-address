import {
  Component,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';

import { each, isArrayLikeObject } from 'lodash-es';
import { FsAddress } from '../../interfaces/address.interface';


@Component({
  selector: 'fs-address-format',
  templateUrl: './address-format.component.html',
  styleUrls: ['./address-format.component.scss']
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

  @Input() format: 'oneline' | 'twoline' | 'summary';
  @Input() includeFirst: 0;
  @Input() disabled = false;
  @Input('name')
  set name(value: string | boolean) {
    this._name = (value === 'true' || (typeof value === 'boolean' && value)) as boolean;
  }

  get name() {
    return this._name;
  }

  public lines: any[] = [];
  public empty = false;

  private _name = true;

  constructor() {}

  public ngOnChanges(changes) {
    if (changes.address && changes.address.previousValue) {
      this.updateView();
    }
  }

  public ngOnInit() {
    this.updateView();
  }

  private updateView() {
    this.format === 'summary' ? this.summaryFormat() : this.lineFormat();
  }

  private lineFormat() {

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

  private summaryFormat() {
    const parts = ['name', 'street', 'city', 'region', 'country'];
    const address = [];
    this.lines = [];

    if (this.address) {

      for ( let i = 0; i < parts.length; i++) {
        const field = parts[i];
        const part = this.address[field];

        if (field === 'name' && this.name && part) {
          address.push(part);
          break;

        } else if (part && field !== 'name') {
          address.push(part);

          const nextPart = this.address[parts[i + 1]];
          if (nextPart) {
            address.push(nextPart);
          }

          break;
        }
      }
    }

    this.empty = !address.length;

    if (!this.empty) {
      this.lines = [address];
    }
  }
}
