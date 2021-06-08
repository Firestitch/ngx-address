import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isObject } from 'lodash-es';

// Interfaces
import { FsAddress, } from '../../interfaces/address.interface';
import { AddressPickerConfig } from '../../interfaces/address-config.interface';

import { FsAddressSearchComponent } from '../address-search/address-search.component';
import { FsAddressComponent } from '../address/address.component';
import { AddressFormat } from '../../enums/address-format.enum';
import { FsAddressDialogComponent } from '../address-dialog/address-dialog.component';
import { AddressSearchEditEvent } from '../address-search/address-search.interface';


@Component({
  selector: 'fs-address-picker',
  templateUrl: './address-picker.component.html',
  styleUrls: ['./address-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressPickerComponent implements OnDestroy {

  @ViewChild(FsAddressSearchComponent, { static: true })
  public addressSearch: FsAddressSearchComponent;

  @Input('config') set setConfig(config: AddressPickerConfig) {

    if (!config.format) {
      config.format = AddressFormat.TwoLine;
    }

    config.search = true;
    if (!isObject(config.map)) {
      config.map = { showMap: false };
    }

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
  public config: AddressPickerConfig = {};
  private _name = true;

  private _destroy$ = new Subject();

  constructor(
    private _dialog: MatDialog,
    private _cdRef: ChangeDetectorRef,
  ) { }

  public open(event: AddressSearchEditEvent): void {
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
      takeUntil(this._destroy$)
    )
    .subscribe(result => {
      // hard dirty fix for DT-T867.
      // In future it must be ControlValue Accessor...
      if (!event.initialChange) {
        this.search.autocomplete.value = this.address;
      }

      if (result) {
        this.address = result;
        this.addressChange.emit(this.address);
      } else {
        if (event.initialChange) {
          this.address = {};
          this.search.clear();
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
