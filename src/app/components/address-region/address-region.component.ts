import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { IFsAddressRegionConfig } from '../../interfaces/address-region-config.interface';
import { COUNTRIES } from './../../constants/inject-token-countries';

@Component({
  selector: 'fs-address-region',
  templateUrl: './address-region.component.html',
  styleUrls: ['./address-region.component.scss'],
})
export class FsAddressRegionComponent implements OnInit {
  // ADDRESS Two-way binding
  @Input() config: IFsAddressRegionConfig = {};
  @Input() country = '';
  @Input() region = '';

  @Output() countryChange = new EventEmitter<any>();
  @Output() regionChange = new EventEmitter<any>();

  public countries = [];

  constructor(@Inject(COUNTRIES) countries) {
    this.countries = countries;
  }

  public ngOnInit() {
    this.initConfig();
  }

  public changeCountry() {
    this.countryChange.emit(this.country);
  }

  public changeRegion() {
    this.regionChange.emit(this.region);
  }

  private initConfig() {
    this.config = Object.assign({
      country: { required: false },
      region: { required: false },
    }, this.config);
  }


}
