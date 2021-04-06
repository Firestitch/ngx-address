import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';

import { Subject } from 'rxjs';
import { guid } from '@firestitch/common';

import { FsAddress } from '../../interfaces/address.interface';
import { IFsAddressConfig } from '../../interfaces/address-config.interface';
import { AddressFormat } from '../../enums/address-format.enum';
import { createEmptyAddress } from '../../helpers/create-empty-address';
import { FsAddressAutocompleteComponent } from '../address-autocomplete/address-autocomplete.component';


@Component({
  selector: 'fs-address-search',
  templateUrl: './address-search.component.html',
  styleUrls: ['./address-search.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressSearchComponent implements OnInit, OnDestroy {

  @Input()
  public set config(value: IFsAddressConfig) {
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

  public get config(): IFsAddressConfig {
    return this._config;
  }

  @Input() name = true;
  @Input() address: FsAddress = {};
  @Input() format = AddressFormat.TwoLine;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() editDialog = true;
  @Input() required = false;

  @Output() cleared: EventEmitter<any> = new EventEmitter<any>();
  @Output() edited: EventEmitter<any> = new EventEmitter<any>();
  @Output() addressChange = new EventEmitter();

  @ViewChild(FsAddressAutocompleteComponent)
  public autocomplete: FsAddressAutocompleteComponent;

  public autocompleteName = `search-${guid('xxxxxxxx')}`;

  private _destroy$ = new Subject<void>();
  private _config: IFsAddressConfig = {};

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _ngForm: NgForm,
    private _cdRef: ChangeDetectorRef,
  ) {}

  public get editable(): boolean {
    return !this.disabled && !this.readonly && this.editDialog;
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public edit() {
    if (!this.editable) {
      return;
    }

    this.edited.emit();
  }

  public clear() {
    this.address = createEmptyAddress();
    this.cleared.emit(createEmptyAddress());
    this.addressChange.emit(createEmptyAddress());

    this.autocomplete.clear();
  }

  public addressChanged(): void {
    this.addressChange.emit(this.address);
  }

}
