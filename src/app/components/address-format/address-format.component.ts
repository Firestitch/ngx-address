import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
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
export class FsAddressFormatComponent implements OnInit {

  private _address: FsAddress = {};

  @Input()
  public set address(address) {
    this._address = address;
    this._updateView();
  }

  public get address() {
    return this._address;
  }

  @Input() format: AddressFormat = AddressFormat.OneLine;
  @Input() includeFirst: 0;
  @Input() disabled = false;
  @Input('name')
  public set name(value: boolean) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  public lines: any[] = [];
  public empty = false;

  private _name = true;

  public ngOnInit() {
    this._updateView();
  }

  private _updateView() {
    const address = {
      ...this.address,
      name: this.name ? this.address?.name : null,
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
