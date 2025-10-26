import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { AddressFormat } from '../../enums/address-format.enum';
import { addressOneLineFormat, addressSummaryFormat, addressTwoLineFormat } from '../../helpers';
import { FsAddress } from '../../interfaces/address.interface';
import { NgClass } from '@angular/common';


@Component({
    selector: 'fs-address-format',
    templateUrl: './address-format.component.html',
    styleUrls: ['./address-format.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass],
})
export class FsAddressFormatComponent implements OnInit {

  @Input()
  public set address(address) {
    this._address = address;
    this._updateView();
  }

  public get address() {
    return this._address;
  }

  @Input() public format: AddressFormat = AddressFormat.OneLine;
  @Input() public includeFirst: 0;
  @Input() public disabled = false;
  @Input() public showName = true;

  public lines: string[];

  private _address: FsAddress = {};

  public ngOnInit() {
    this._updateView();
  }

  public get empty() {
    return !!this.lines?.length;
  }

  private _updateView() {
    const address = {
      ...this.address,
      name: this.showName ? this.address?.name : null,
    };

    switch (this.format) {
      case AddressFormat.Summary: {
        this.lines = addressSummaryFormat(address).split('\n');
        break;
      }
      case AddressFormat.OneLine: {
        this.lines = addressOneLineFormat(address, { includeFirst: this.includeFirst }).split('\n');
        break;
      }
      case AddressFormat.TwoLine: {
        this.lines = addressTwoLineFormat(address, { includeFirst: this.includeFirst }).split('\n');
        break;
      }
    }

  }

}
