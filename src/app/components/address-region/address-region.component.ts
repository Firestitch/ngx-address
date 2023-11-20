import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';


import { FsAutocompleteComponent } from '@firestitch/autocomplete';
import { guid } from '@firestitch/common';
import { controlContainerFactory } from '@firestitch/core';

import { Subject, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Countries } from '../../consts';
import { Country } from '../../enums/country.enum';
import { searchCountryRegions } from '../../helpers';
import { IAddressCountry } from '../../interfaces/address-country.interface';
import { IAddressRegion } from '../../interfaces/address-region.interface';


@Component({
  selector: 'fs-address-region',
  templateUrl: './address-region.component.html',
  styleUrls: ['./address-region.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: controlContainerFactory,
      deps: [[new Optional(), NgForm]],
    },
  ],
})
export class FsAddressRegionComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public region: string;
  @Input() public disabled = false;
  @Input() public label;
  @Input() public required = false;
  @Input() public regionCountryOrder = [Country.Canada, Country.UnitedStates];
  @Input() public set countries(countries: string[]) {
    this._countries = countries;
    if (this._countries.length === 1) {
      this.country = this._countries[0];
    }
  }

  @Output() public regionChange = new EventEmitter<string>();

  @Input('country')
  public set country(value) {
    this._country = value;
    this.updateCountryRegionLabels();
  }

  public get country(): string {
    return this._country;
  }

  public model;
  public controlName = `region_${guid('xxxxxx')}`;
  public regionLabel;
  public canadaCountryItem: IAddressCountry;
  public usCountryItem: IAddressCountry;
  public canadaRegions: IAddressRegion[];
  public usRegions: IAddressRegion[];
  public canadaRegionsIsFirst = false;
  public countryEnum = Country;

  @ViewChild(FsAutocompleteComponent, { read: NgModel, static: true })
  private _autocompleteModel: NgModel;

  private _country;
  private _countries: string[];
  private _destroy$ = new Subject<void>();

  constructor(private _cdRef: ChangeDetectorRef) { }

  public ngOnInit() {
    this._detectCountriesOrder();
    this._initCanadaItems();
    this._initUsItems();
    this.updateCountryRegionLabels();
    this._listenControlStateChanges();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.region && !!this.region) {
      const country: IAddressCountry = this._countries
        .filter((code) => code === this.country)
        .map((code) => Countries.find((c) => c.code === code))
        .pop();

      if (country?.regions) {
        this.model = country.regions.find((region) => {
          return region.code === this.region;
        });
      }

      if (!this.model) {
        const region = country?.regions.find((r) => this.region === r.code);
        const name = region?.name || this.region;
        this.model = { name, code: this.region };
      }
    }

    if (changes.country && !this._country) {
      this.model = null;
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public fetch = (keyword: string) => {
    return of(keyword)
      .pipe(
        map((kw) => {
          const canadaMatches = searchCountryRegions(kw, this.canadaRegions);
          const usMatches = searchCountryRegions(kw, this.usRegions);

          switch (this._country) {
            case Country.Canada: {
              return [
                ...canadaMatches,
                ...usMatches,
              ];
            }

            case Country.UnitedStates: {
              return [
                ...usMatches,
                ...canadaMatches,
              ];
            }

            default: {
              if (this.canadaRegionsIsFirst) {
                return [
                  ...canadaMatches,
                  ...usMatches,
                ];
              }

              return [
                ...usMatches,
                ...canadaMatches,
              ];

            }
          }
        }),
      );
  };

  public displayWith = (data) => {
    return data.name;
  };

  public selectUserOption(keyword) {
    this.model = {
      code: keyword,
      name: keyword,
    };

    this.regionChange.emit(keyword);
  }

  public regionChanged() {
    this.regionChange.emit(this.model?.code);
  }

  public justUseShow = (keyword) => {
    return !!keyword;
  };

  public updateCountryRegionLabels() {
    if (this.label) {
      this.regionLabel = this.label;

    } else {
      this.regionLabel = this._country === Country.Canada
        ? 'Province'
        : this._country === Country.UnitedStates ? 'State' : 'Province/State';
    }
  }

  private _initCanadaItems(): void {
    this.canadaCountryItem = Countries
      .find((country) => {
        return country.code === Country.Canada;
      });

    this.canadaRegions = this.canadaCountryItem?.regions;
    this.canadaRegions.forEach((region) => {
      region.country = this.canadaCountryItem.code;
    });
  }

  private _initUsItems(): void {
    this.usCountryItem = Countries
      .find((country) => {
        return country.code === Country.UnitedStates;
      });

    this.usRegions = this.usCountryItem?.regions;
    this.usRegions.forEach((region) => {
      region.country = this.usCountryItem.code;
    });
  }

  private _detectCountriesOrder() {
    this.canadaRegionsIsFirst = this.regionCountryOrder.indexOf(Country.Canada) === 0;
  }

  // we need this to get updated ng-(invalid/dirty) classes
  private _listenControlStateChanges(): void {
    this._autocompleteModel
      .control
      .statusChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._cdRef.markForCheck();
      });
  }

}
