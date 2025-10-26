import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  ViewChild
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { FsAddress } from '../../interfaces/address.interface';
import { FsAddressComponent } from '../../components/address/address.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsAddressComponent as FsAddressComponent_1 } from '../address/address.component';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './address-dialog.component.html',
    styleUrls: ['./address-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        FsDialogModule,
        CdkScrollable,
        MatDialogContent,
        FsAddressComponent_1,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class FsAddressDialogComponent {

  @ViewChild(FsAddressComponent)
  public addressComponent: FsAddressComponent;

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
