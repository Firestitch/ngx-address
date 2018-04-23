import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import { AgmMap, AgmMarker, MapsAPILoader } from '@agm/core';
import { IFsAddressConfig } from '../../interfaces/address-config.interface';
import { FsAddress } from '../../interfaces/address.interface';
import set = Reflect.set;

@Component({
  selector: 'fs-address-picker',
  templateUrl: './fs-address-picker.component.html',
  styleUrls: ['./fs-address-picker.component.scss'],
})
export class FsAddressPickerComponent implements OnInit, OnDestroy {

  // ADDRESS Two-way binding
  public addressValue: any;
  @Input() get address() {
    return this.addressValue;
  }
  @Output() addressChange = new EventEmitter();
  set address(value: string) {
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
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  // BINDING END

  // Others
  public addressDetails: FsAddress;
  public isEdit: boolean = false;

  constructor(
    private _cdRef: ChangeDetectorRef,
  ) {
    this.isEdit = false;
  }

  ngOnInit() {}

  ngOnDestroy() {}

  public edit() {
    this.isEdit = true;
    this._cdRef.detectChanges(); // TODO change to better emit of change. Without - DOM doesn't change
  }

  public clear() {
    this.addressDetails = void 0;
    this.addressValue = void 0;
    this._cdRef.detectChanges(); // TODO change to better emit of change. Without - DOM doesn't change
  }

  public save() {
    this.isEdit = false;
    this._cdRef.detectChanges(); // TODO change to better emit of change. Without - DOM doesn't change
  }

  public selectSearch(event: FsAddress) {
    console.log(event);
    if (event) {
      this.addressDetails = event;
      this._cdRef.detectChanges(); // TODO change to better emit of change. Without - DOM doesn't change
    }
  }
}
