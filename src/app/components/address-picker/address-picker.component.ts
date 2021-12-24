import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  OnChanges, SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isObject, cloneDeep } from 'lodash-es';

// Interfaces
import { FsAddress, } from '../../interfaces/address.interface';
import { FsAddressPickerConfig } from '../../interfaces/address-config.interface';

import { FsAddressSearchComponent } from '../address-search/address-search.component';
import { FsAddressComponent } from '../address/address.component';
import { AddressFormat } from '../../enums/address-format.enum';
import { FsAddressDialogComponent } from '../address-dialog/address-dialog.component';
import { AddressSearchEditEvent } from '../address-search/address-search.interface';
import { createEmptyAddress } from '../../helpers/create-empty-address';


@Component({
  selector: 'fs-address-picker',
  templateUrl: './address-picker.component.html',
  styleUrls: ['./address-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressPickerComponent implements OnChanges, OnDestroy {

  @ViewChild(FsAddressSearchComponent, { static: true })
  public addressSearch: FsAddressSearchComponent;

  @Input('config') set setConfig(config: FsAddressPickerConfig) {
    config = cloneDeep(config);

    if (!config.format) {
      config.format = AddressFormat.TwoLine;
    }

    config.search = true;
    if (!isObject(config.map)) {
      config.map = { showMap: false };
    }

    config.disabled = this.config.disabled;
    config.readonly = this.config.readonly;

    this.config = config;
  }

  @Input('format') set setFormat(value) {
    this.config.format = value;
  }

  @Input('disabled') set setDisabled(value) {
    this.config.disabled = value;
  }

  @Input('readonly') set setReadonly(value) {
    this.config.readonly = value;
  }

  @Input()
  public editDialog = true;

  @Input() public address: FsAddress;

  @Output() public addressChange = new EventEmitter();

  @Input('name')
  set name(value: string | boolean) {
    this._name = (value === 'true' || (typeof value === 'boolean' && value)) as boolean;
  }

  get name() {
    return this._name;
  }

  @ViewChild(FsAddressSearchComponent) public search: FsAddressSearchComponent;
  @ViewChild(FsAddressComponent) public editable: FsAddressComponent;

  public view = 'search';
  public config: FsAddressPickerConfig = {};
  private _name = true;

  private _dialogRef: MatDialogRef<any>;
  private _destroy$ = new Subject();

  constructor(
    private _dialog: MatDialog,
    private _cdRef: ChangeDetectorRef,
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (
      changes.address
      && changes.address.currentValue !== changes.address.previousValue
    ) {
      if (!this.address) {
        this.address = createEmptyAddress();
      }
    }
  }

  public open(event: AddressSearchEditEvent): void {
    // because of the issue in HM-T1804
    // so lets leave it like that for now and feel free to find solution in future
    if (this._dialogRef) {
      return;
    }

    this._dialogRef = this._dialog.open(FsAddressDialogComponent, {
      width: '700px',
      data: {
        address: event.value || this.address,
        config: this.config,
        initial: event.initialChange,
      }
    });

    this._dialogRef.afterClosed()
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(result => {
      this._dialogRef = null;
      // hard dirty fix for DT-T867.
      // In future it must be ControlValue Accessor...
      if (result) {
        this.search.autocomplete.value = this.address;
      }

      if (result) {
        this.address = result;
        this.addressChange.emit(this.address);
      } else {
        if (event.initialChange) {
          this.address = {};
          this.search.clear();
          this.search.resetAutocomplete();
        }
      }

      this._cdRef.markForCheck();
    });
  }

  public searchEdited(event: AddressSearchEditEvent) {
    if (this.editDialog) {
      this.open(event);
    }
  }

  public clear() {
    this.address = {};
    this.addressSearch.clear();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
