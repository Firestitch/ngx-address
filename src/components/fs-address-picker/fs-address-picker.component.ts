import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

// Interfaces
import {
  IFsAddressConfig,
  FsAddress,
  IFsAddressFormatConfig
} from '../../interfaces';


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
  // BINDING END

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
  // BINDING END

  @Input() addressFormatConfig: IFsAddressFormatConfig;

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
}
