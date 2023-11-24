import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Countries } from '../../consts';
import { FsAddressRegionConfig } from '../../interfaces/address-region-config.interface';


@Component({
  selector: 'fs-address-region-country',
  templateUrl: './address-region-country.component.html',
  styleUrls: ['./address-region-country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsAddressRegionCountryComponent implements OnInit {

  @HostBinding('class.vertical') public orientationVertical = true;
  @HostBinding('class.horizontal') public orientationHorizontal = false;
  @HostBinding('class.horizontal-stretch') public orientationHorizontalStretch = false;

  @Input() public config: FsAddressRegionConfig = {};
  @Input() public country: string;
  @Input() public region: string;
  @Input('orientation') public set setOrientation(value) {
    this.orientationVertical = value === 'vertical';
    this.orientationHorizontal = value === 'horizontal';
    this.orientationHorizontalStretch = value === 'horizontal-stretch';
  }

  @Output() public countryChange = new EventEmitter<any>();
  @Output() public regionChange = new EventEmitter<any>();

  public countries = Countries;
  public regionCountries;

  public ngOnInit() {
    this._initConfig();
  }

  public changeCountry() {
    this.regionCountries = this.country ? [this.country] : null;
    if (!this.country) {
      this.region = null;
    }

    this.regionChange.emit(this.region);
    this.countryChange.emit(this.country);
  }

  public changeRegion() {
    if (!!this.region) {
      const regionCountry = this.countries.find((country) => {
        return country.regions
          && country.regions.find((region) => this.region === region.code);
      });

      if (regionCountry) {
        this.country = regionCountry.code;
        this.changeCountry();
      }
    }

    this.regionChange.emit(this.region);
  }

  private _initConfig() {
    this.config = {
      country: { required: false },
      region: { required: false }, ...this.config,
    };

    if (this.config.country.list) {
      this.countries = Countries.filter((country) => {
        return this.config.country.list.indexOf(country.code) >= 0;
      });
    }
  }


}
