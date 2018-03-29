import { Component, Input, Output,
  EventEmitter, KeyValueDiffers, OnInit, DoCheck } from '@angular/core';
import { each, isArrayLikeObject } from 'lodash';

@Component({
  selector: 'fs-address-format',
  template: `
    <ng-container *ngFor="let key of configKeys">
      <span class="{{key}}" *ngIf="address[config[key]['name']]">{{address[config[key]['name']]}}</span>
    </ng-container>`,
  styles: [
  `span::after { content: ", "; }`,
  `span:last-child:after { content: ""; }`
  ],
})
export class FsAddressFormatComponent implements OnInit, DoCheck {

  @Input()
  set address(address) {
    this._address = address;
    if (!this._addressDiffer && address) {
      this._addressDiffer = this.differs.find(address).create();
    }
  }

  get address() {
    return this._address;
  }

  @Input() config = {};
  @Output() change = new EventEmitter<any>();

  public configKeys = [];

  private _address = {};
  private _addressDiffer = null;
  private _defaultKeys = ['address', 'address2', 'city', 'region', 'zip', 'country'];

  constructor(private differs: KeyValueDiffers) { }

  ngOnInit() {
    each(this._defaultKeys, item => {
      if (!isArrayLikeObject(this.config[item])) {
        this.config[item] = {};
      }

      if (!this.config[item].name) {
        this.config[item].name = item;
      }
    });

    this.configKeys = Object.keys(this.config);
  }

  ngDoCheck() {
    if (this._addressDiffer) {
      const changes = this._addressDiffer.diff(this.address);
      if (changes) {
        const parts = [];

        each(this.configKeys, key => {
          if (this.address[this.config[key]['name']]) {
            parts.push(this.address[this.config[key]['name']]);
          }
        });
        setTimeout(() => {
          this.change.emit(parts);
        });
      }
    }
  }
}
