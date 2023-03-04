import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  ViewChild
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FsAddress } from '../../interfaces/address.interface';
import { FsAddressComponent } from '../../components/address/address.component';
import { of } from 'rxjs';


@Component({
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressDialogComponent {

  @ViewChild(FsAddressComponent) addressComponent;

  public address: FsAddress;
  public config;

  constructor(
    private _dialogRef: MatDialogRef<FsAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data) {
      this.address = _data.address;
      this.config = _data.config;
  }

  public get initialEditDialog(): boolean {
    return this._data.initial;
  }

  public submit = () => {
    this._dialogRef.close(this.address);
    
    return of(true);
  }

  public addressChange(address) {
    this.address = address;
  }

  public recenter() {
    this.addressComponent.recenter();
  }
}
