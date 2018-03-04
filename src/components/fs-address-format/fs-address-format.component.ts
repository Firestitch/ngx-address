import { Component, OnInit, Input } from '@angular/core';
import { FsUtil } from '@firestitch/common';

@Component({
  selector: 'fs-address-format',
  template: `
    <div *ngFor="let key of configKeys">
      <span class="{{key}}" *ngIf="address[config[key]['name']]">{{address[config[key]['name']]}}</span>
    </div>`,
  styles: [
  `span::after { content: ", "; }`,
  `span:last-child:after { content: ""; }`
  ],
})
export class FsAddressFormatComponent implements OnInit {

  @Input() address = {};
  @Input() config = {};
  public configKeys = [];

  constructor(private fsUtil: FsUtil) {}

  ngOnInit() {
    this.fsUtil.each(['address', 'address2', 'city', 'region', 'zip', 'country'], item => {
      if (!this.fsUtil.isObject(this.config[item])) {
        this.config[item] = {};
      }

      if (!this.config[item].name) {
        this.config[item].name = item;
      }
    });

    this.configKeys = Object.keys(this.config);
  }
}
