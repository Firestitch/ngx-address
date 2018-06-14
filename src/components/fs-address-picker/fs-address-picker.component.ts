import {
  Component,
  EventEmitter,
  Input,
  AfterViewInit,
  Output,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  IFsAddressConfig,
  FsAddress,
} from '../../interfaces';

import { FsAddressSearchComponent } from '../fs-address-search';


@Component({
  selector: 'fs-address-picker',
  templateUrl: './fs-address-picker.component.html',
  styleUrls: ['./fs-address-picker.component.scss'],
})
export class FsAddressPickerComponent implements AfterViewInit {

  @Input() address: FsAddress;
  @Input() config: IFsAddressConfig;
  @Input() format = 'oneline';
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(FsAddressSearchComponent) search: FsAddressSearchComponent;

  public view = 'search';
  public showEdit = false;
  public showClear = false;

  constructor() {}

  ngAfterViewInit() {
    this.viewSearch();
  }

  public viewSearch() {
    this.view = 'search';
    if (!this.search.emptyAddress) {
      this.showClear = true;
      this.showEdit = true;
    }
  }

  public viewEdit() {
    this.view = 'edit';
    this.showClear = false;
    this.showEdit = false;
  }

  public searchEdited() {
    this.viewEdit();
  }

  public searchChanged(address) {
    this.viewSearch();
    this.address = address;
    this.changed.emit(address);
  }
}
