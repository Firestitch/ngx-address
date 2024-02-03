import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';


// Interfaces
import {
  FsAddress,
  FsAddressConfig,
} from '@firestitch/address';


@Component({
  selector: 'address-picker-custom-collapse-btn-example',
  templateUrl: './address-picker-custom-collapse-btn-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressPickerCustomCollapseBtnComponent {

  public address: FsAddress = {};
  public config: FsAddressConfig = {
    map: { zoom: 15 },
    collapseButton: { title: 'Show search view', color: 'warn', theme: 'mat-stroked-button' },
  };

  public changed(address) {
    this.address = address;
  }
}
