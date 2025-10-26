import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  FsAddress,
  FsAddressConfig,
} from '@firestitch/address';
import { FormsModule } from '@angular/forms';
import { FsAddressPickerComponent } from '../../../../src/app/components/address-picker/address-picker.component';
import { FsAddressFormatComponent } from '../../../../src/app/components/address-format/address-format.component';


@Component({
    selector: 'address-picker-custom-collapse-label-example',
    templateUrl: './address-picker-custom-collapse-label-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsAddressPickerComponent,
        FsAddressFormatComponent,
    ],
})
export class AddressPickerCustomCollapseLabelComponent {

  public address: FsAddress = {};
  public config: FsAddressConfig = {
    label: 'Mailing Address',
    map: { zoom: 15 },
    collapseButton: { title: 'Show search view', color: 'warn', theme: 'mat-stroked-button' },
  };

  public changed(address) {
    this.address = address;
  }
}
