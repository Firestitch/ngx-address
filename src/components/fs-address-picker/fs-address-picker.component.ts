import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

// Interfaces
import { IFsAddressConfig } from '../../interfaces/address-config.interface';
import { FsAddress } from '../../interfaces/address.interface';
import { IFsAddressMapConfig } from '../../interfaces/address-map-config.interface';


@Component({
  selector: 'fs-address-picker',
  templateUrl: './fs-address-picker.component.html',
  styleUrls: ['./fs-address-picker.component.scss'],
})
export class FsAddressPickerComponent implements OnInit, OnDestroy {

  // ADDRESS Two-way binding
  public addressValue: FsAddress;
  @Input() get address() {
    return this.addressValue;
  }
  @Output() addressChange = new EventEmitter();
  set address(value: FsAddress) {
    this.addressValue = value;
    this.addressChange.emit(this.addressValue);
  }

  // CONFIG Two-way binding
  public configValue: IFsAddressConfig;
  @Input() get config() {
    return this.configValue;
  }
  @Output() configChange = new EventEmitter();
  set config(value: IFsAddressConfig) {
    this.configValue = value;
    this.configChange.emit(this.configValue);
  }

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  // BINDING END

  // Others
  public isEdit: boolean;

  constructor() {
    this.isEdit = false;
  }

  ngOnInit() {}

  ngOnDestroy() {}

  public closeEdit() {
    this.isEdit = false;
  }

  public changed(event: FsAddress) {

    this.change.emit(event);
    if (event) {
      this.address = event;
    }
  }
}
