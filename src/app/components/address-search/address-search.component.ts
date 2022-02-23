import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';

import { Subject } from 'rxjs';

import { guid } from '@firestitch/common';
import { controlContainerFactory } from '@firestitch/core';

import { FsAddress } from '../../interfaces/address.interface';
import { FsAddressPickerConfig } from '../../interfaces/address-config.interface';
import { AddressFormat } from '../../enums/address-format.enum';
import { createEmptyAddress } from '../../helpers/create-empty-address';
import { FsAddressAutocompleteComponent } from '../address-autocomplete/address-autocomplete.component';


@Component({
  selector: 'fs-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressSearchComponent implements OnDestroy {

  @Input()
  public set config(value: FsAddressPickerConfig) {
    this._config = value;
    if (this._config) {
      this.required =
      ( (this.config.name && this.config.name.required) ||
        (this.config.country && this.config.country.required) ||
        (this.config.region && this.config.region.required) ||
        (this.config.city && this.config.city.required) ||
        (this.config.street && this.config.street.required) ||
        (this.config.address2 && this.config.address2.required) ||
        (this.config.address3 && this.config.address3.required) ||
        (this.config.zip && this.config.zip.required));
    }
  }

  public get config(): FsAddressPickerConfig {
    return this._config;
  }

  @Input() name = true;
  @Input() address: FsAddress = {};
  @Input() format = AddressFormat.TwoLine;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;

  @Output() cleared: EventEmitter<any> = new EventEmitter<any>();
  @Output() addressChange = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() selected = new EventEmitter();

  @ViewChild(FsAddressAutocompleteComponent)
  public autocomplete: FsAddressAutocompleteComponent;

  public autocompleteName = `search-${guid('xxxxxxxx')}`;

  //private _initialChange;
  private _destroy$ = new Subject<void>();
  private _config: FsAddressPickerConfig = {};

  public get editable(): boolean {
    return !this.disabled && !this.readonly;
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public clear() {
    this.address = createEmptyAddress();
    this.cleared.emit(createEmptyAddress());
    this.addressChange.emit(createEmptyAddress());
    this.autocomplete.clear();
  }

  public resetAutocomplete(): void {
    this.autocomplete.reset();
  }

  public editClick(): void {
    if (this.editable) {
      this.edit.emit();
    }
  }

  public addressSelected(): void {
    this.selected.emit(this.address);
    this.addressChange.emit(this.address);
  }

}
