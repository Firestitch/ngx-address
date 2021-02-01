import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit, OnChanges, SimpleChanges,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { searchCountryRegions } from '../../helpers';
import { IAddressCountry } from '../../interfaces/address-country.interface';
import { IAddressRegion } from '../../interfaces/address-region.interface';
import { Country } from '../../enums/country.enum';


@Component({
  selector: 'fs-address-region',
  templateUrl: './address-region.component.html',
  styleUrls: ['./address-region.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
})
export class FsAddressRegionComponent implements OnInit, OnChanges {

  @Input() public region: string;
  @Input() public countries = [];
  @Input() public disabled = false;
  @Input() public label;
  @Input() public required = false;

  @Output() public regionChange = new EventEmitter<string>();

  @Input('country')
  public set country(value) {
    this._country = value;
    this.updateCountryRegionLabels();
  }

  public model;

  public regionLabel;
  public canadaCountryItem: IAddressCountry;
  public usCountryItem: IAddressCountry;
  public canadaRegions: IAddressRegion[];
  public usRegions: IAddressRegion[];

  public countryEnum = Country;

  private _country;

  constructor() { }

  public get country(): string {
    return this._country;
  }

  public ngOnInit() {
    this._initCanadaItems();
    this._initUsItems();
    this.updateCountryRegionLabels();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.region && !!this.region) {
      const country  = this.countries.find((c) => c.code === this.country);
      if (country && country.regions) {
        this.model = country.regions.find((region) => {
          return region.code === this.region;
        });
      }

      if (!this.model) {
        this.model = { name: this.region, code: this.region };
      }
    }
  }

  public fetch = (keyword: string) => {
    return of(keyword)
      .pipe(
        map((kw) => {
          const canadaMatches = searchCountryRegions(kw, this.canadaRegions, 3);
          const usMatches = searchCountryRegions(kw, this.usRegions, 3);

          switch (this._country) {
            case Country.Canada: {
              return [
                ...canadaMatches,
                ...usMatches,
              ]
            }

            case Country.UnitedStates: {
              return [
                ...usMatches,
                ...canadaMatches,
              ]
            }

            default: {
              return [
                ...usMatches,
                ...canadaMatches,
              ];
            }
          }
        }),
      )
  }

  public displayWith = (data) => {
    return data.name;
  };

  public selectUserOption(kw: string) {
    this.model = {
      code: kw,
      name: kw,
    };
    this.regionChange.emit(kw);
  }

  public regionChanged() {
    this.regionChange.emit(this.model?.code);
  }

  public updateCountryRegionLabels() {
    if (this.label) {
      this.regionLabel = this.label

    } else {
      this.regionLabel = this._country === Country.Canada
      ? 'Province'
      : this._country === Country.UnitedStates ? 'State' : 'Province/State';
    }
  }

  private _initCanadaItems(): void {
    this.canadaCountryItem = this.countries
      .find((country) => {
        return country.code === Country.Canada;
      });

    this.canadaRegions = this.canadaCountryItem?.regions;
    this.canadaRegions.forEach((region) => {
      region.country = this.canadaCountryItem.code;
    });
  }

  private _initUsItems(): void {
    this.usCountryItem = this.countries
      .find((country) => {
        return country.code === Country.UnitedStates;
      });

    this.usRegions = this.usCountryItem?.regions;
    this.usRegions.forEach((region) => {
      region.country = this.usCountryItem.code;
    });
  }

}
