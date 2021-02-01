import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { Country } from '../../enums/country.enum';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { searchRegions } from '../../helpers';
import { IAddressCountry } from '../../interfaces/address-country.interface';
import { IAddressRegion } from '../../interfaces/address-region.interface';


@Component({
  selector: 'fs-address-region',
  templateUrl: './address-region.component.html',
  styleUrls: ['./address-region.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
})
export class FsAddressRegionComponent implements OnInit {

  @Input() public region: string;
  @Input() public countries = [];
  @Input() public disabled = false;
  @Input() public label;
  @Input() public required = false;
  @Output() public regionChange = new EventEmitter<string>();
  @Input('country')
  set country(value) {
    this._country = value;
    this.updateCountryRegionLabels();
  }

  public model;

  public regionLabel;
  public canadaCountryItem: IAddressCountry;
  public usCountryItem: IAddressCountry;
  public canadaRegions: IAddressRegion[];
  public usRegions: IAddressRegion[];

  private _country;

  constructor() { }

  public ngOnInit() {
    this._initCanadaItems();
    this._initUsItems();
    this.updateCountryRegionLabels();
  }

  public fetch = (keyword: string) => {
    return of(keyword)
      .pipe(
        map((kw) => {
          let canadaMatches = searchRegions(kw, this.canadaRegions, 3);
          let usMatches = searchRegions(kw, this.usRegions, 3);

          switch (this._country) {
            case Country.Canada: {
              const secondaryResults = this._markSecondaryRegions(
                usMatches,
                this.usCountryItem
              );

              return [
                ...canadaMatches,
                ...secondaryResults,
              ]
            }

            case Country.UnitedStates: {
              const secondaryResults = this._markSecondaryRegions(
                canadaMatches,
                this.canadaCountryItem
              );

              return [
                ...usMatches,
                ...secondaryResults,
              ]
            }

            default: {
              usMatches = this._markSecondaryRegions(
                usMatches,
                this.usCountryItem
              );

              canadaMatches = this._markSecondaryRegions(
                canadaMatches,
                this.canadaCountryItem
              );

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

  private _markSecondaryRegions(matches: IAddressRegion[], countryItem: IAddressCountry) {
    matches = matches.map((match) => {
      return { ...match };
    });

    matches.forEach((match) => {
      match.name = `${match.name}, ${countryItem.name}`
    });

    return matches;
  }

  private _initCanadaItems(): void {
    this.canadaCountryItem = this.countries
      .find((country) => {
        return country.code === Country.Canada;
      });

    this.canadaRegions = this.canadaCountryItem?.regions;
  }

  private _initUsItems(): void {
    this.usCountryItem = this.countries
      .find((country) => {
        return country.code === Country.UnitedStates;
      });

    this.usRegions = this.usCountryItem?.regions;
  }

}
