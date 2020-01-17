import {
  Component,
  Input,
  OnInit,
  OnChanges, ChangeDetectionStrategy,
} from '@angular/core';

import { each } from 'lodash-es';
import { FsAddress } from '../../interfaces/address.interface';
import { AddressFormat } from '../../enums/address-format.enum';


@Component({
  selector: 'fs-address-format',
  templateUrl: './address-format.component.html',
  styleUrls: ['./address-format.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @Input() format: AddressFormat;
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
      this._updateView();
    }
  }

  public ngOnInit() {
    this._updateView();
  }

  private _updateView() {
    if (this.format === AddressFormat.Summary) {
      this.summaryFormat();
    } else {
      this.lineFormat();
    }
  }

  private lineFormat() {

    const parts = ['name', 'street', 'address2', 'city', 'region', 'zip', 'country'];
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

      if (this.format === AddressFormat.TwoLine) {
        this.lines = [[address.shift()]];
        this.lines.push(address);
      }
    }
  }

  private summaryFormat() {
    const parts = ['name', 'street', 'address2', 'city', 'region', 'country'];
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
