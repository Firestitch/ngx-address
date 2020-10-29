import {
  Component,
  Input,
  OnInit,
  OnChanges, ChangeDetectionStrategy,
} from '@angular/core';

import { FsAddress } from '../../interfaces/address.interface';
import { AddressFormat } from '../../enums/address-format.enum';
import { addressOneLineFormat, addressTwoLineFormat, addressSummaryFormat } from '../../helpers';


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

  @Input() format: AddressFormat = AddressFormat.OneLine;
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

    const address = {
      ...this.address,
      name: this.name ? this.address.name : null,
    };

    if (this.format === AddressFormat.Summary) {
      const formatted = addressSummaryFormat(address);
      this.lines = formatted ? [formatted] : [];
    } else if (this.format === AddressFormat.OneLine) {
      const formatted = addressOneLineFormat(address, { includeFirst: this.includeFirst });
      this.lines = formatted ? [formatted] : [];
    } else if (this.format === AddressFormat.TwoLine) {
      this.lines = addressTwoLineFormat(address, { includeFirst: this.includeFirst });
    }

    this.empty = !this.lines.length;
  }

}
