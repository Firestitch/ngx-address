import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { cloneDeep, isObject } from 'lodash-es';

import { FsAddressPickerConfig } from '../../interfaces/address-config.interface';
import { FsAddress, } from '../../interfaces/address.interface';

import { ControlContainer, NgForm } from '@angular/forms';
import { controlContainerFactory } from '@firestitch/core';
import { AddressFormat } from '../../enums/address-format.enum';
import { createEmptyAddress } from '../../helpers/create-empty-address';
import { FsAddressDialogComponent } from '../address-dialog/address-dialog.component';
import { FsAddressSearchComponent } from '../address-search/address-search.component';
import { AddressSearchEditEvent } from '../address-search/address-search.interface';


@Component({
  selector: 'fs-address-picker',
  templateUrl: './address-picker.component.html',
  styleUrls: ['./address-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    }
  ],
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

  @Input() public name: boolean = true;

  @ViewChild(FsAddressSearchComponent)
  public search: FsAddressSearchComponent;

  public view = 'search';
  public config: FsAddressPickerConfig = {};

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
    if (this.config.confirmation || address.manual) {
      this.open({ value: address, initialChange: true })
        .afterClosed()
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((result) => {
          if (!result) {
            this.addressSearch.clear();
          }
        });
    } else {
      this.addressChange.emit(address);
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
        takeUntil(this._destroy$),
      )
      .subscribe((result) => {
        this.address = result;

        // hard dirty fix for DT-T867.
        // In future it must be ControlValue Accessor...
        if (result) {
          this.search.autocomplete.value = this.address;
        }

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
