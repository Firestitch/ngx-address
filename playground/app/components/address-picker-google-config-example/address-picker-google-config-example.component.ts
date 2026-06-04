import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import {
  AddressFormat,
  FsAddress,
  FsAddressFormatComponent,
  FsAddressPickerComponent,
  FsAddressPickerConfig,
} from '@firestitch/address';
import { FsFormModule } from '@firestitch/form';
import { FsMessage } from '@firestitch/message';

import { FsAddressFormatComponent as FsAddressFormatComponent_1 } from '../../../../src/app/components/address-format/address-format.component';
import { FsAddressPickerComponent as FsAddressPickerComponent_1 } from '../../../../src/app/components/address-picker/address-picker.component';


@Component({
  selector: 'address-picker-google-config-example',
  templateUrl: './address-picker-google-config-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    MatFormField,
    MatLabel,
    MatHint,
    MatInput,
    FsFormModule,
    FsAddressPickerComponent_1,
    FsAddressFormatComponent_1,
  ],
})
export class AddressPickerGoogleConfigExampleComponent {

  // The raw JSON the user types. Pre-filled with a Places search restricted to
  // retail pharmacies (the autocomplete API uses `includedPrimaryTypes`).
  public json = JSON.stringify(
    {
      includedPrimaryTypes: ['pharmacy'],
      includedRegionCodes: ['us', 'ca'],
    },
    null,
    2,
  );

  public jsonError: string = null;
  public address: FsAddress = {};

  public config: FsAddressPickerConfig = {
    label: 'Location',
    format: AddressFormat.TwoLine,
    map: { showMap: false },
    name: { visible: false },
    street: { visible: true },
    city: { visible: true },
    region: { visible: true },
    zip: { visible: true },
    country: { visible: true },
  };

  private _message = inject(FsMessage);

  constructor() {
    // Apply the pre-filled JSON on load.
    this.jsonChanged();
  }

  // Parse the JSON on every change. When valid, rebuild the picker config with
  // the typed options under `googleConfig.autocomplete` so they flow into the
  // Places search. A new config object reference is set so OnPush picks it up.
  public jsonChanged(): void {
    const value = (this.json || '').trim();

    if (!value) {
      this.jsonError = null;
      this._applyAutocomplete(undefined);

      return;
    }

    try {
      const autocomplete = JSON.parse(value);
      this.jsonError = null;
      this._applyAutocomplete(autocomplete);
    } catch (e) {
      this.jsonError = (e as Error).message;
    }
  }

  public changed(address: FsAddress): void {
    this.address = address;
  }

  public submit(): void {
    this._message.success('Saved');
  }

  private _applyAutocomplete(autocomplete: Record<string, unknown> | undefined): void {
    this.config = {
      ...this.config,
      googleConfig: { autocomplete },
    };
  }
}
