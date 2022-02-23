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
import { filter, takeUntil } from 'rxjs/operators';

import { isObject, cloneDeep } from 'lodash-es';

// Interfaces
import { FsAddress, } from '../../interfaces/address.interface';
import { FsAddressPickerConfig } from '../../interfaces/address-config.interface';

import { FsAddressSearchComponent } from '../address-search/address-search.component';
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

  @Input() public address: FsAddress;

  @Output() public addressChange = new EventEmitter();

  @Input('name')
  set name(value: string | boolean) {
    this._name = (value === 'true' || (typeof value === 'boolean' && value)) as boolean;
  }

  get name() {
    return this._name;
  }

  @ViewChild(FsAddressSearchComponent) 
  public search: FsAddressSearchComponent;

  public view = 'search';
  public config: FsAddressPickerConfig = {};

  private _name = true;
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

  public addressEdit() {
    this.open({ value: this.address, initialChange: false });
  }

  public addressSelected(address) {
    if(this.config.confirmation) {
      this.open({ value: address, initialChange: true })
        .afterClosed()
        .pipe(
          filter((result) => !result),
          takeUntil(this._destroy$)
        )
      .subscribe(() => {
        this.addressSearch.clear(); 
      });
    }
  }

  public open(event: AddressSearchEditEvent): MatDialogRef<FsAddressDialogComponent> {
    const dialogRef = this._dialog.open(FsAddressDialogComponent, {
      width: '700px',
      data: {
        address: event.value || this.address,
        config: this.config,
        initial: event.initialChange,
      }
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result) => !!result),
      takeUntil(this._destroy$)
    )
    .subscribe((result) => {
      this.address = result;
      this.addressChange.emit(this.address);
      this._cdRef.markForCheck();
    });

    return dialogRef;
  }

  public searchEdited(event: AddressSearchEditEvent) {
    this.open(event);
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
