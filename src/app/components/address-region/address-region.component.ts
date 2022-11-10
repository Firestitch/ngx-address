import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  Optional,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';

import { of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { controlContainerFactory } from '@firestitch/core';
import { guid } from '@firestitch/common';
import { FsAutocompleteComponent } from '@firestitch/autocomplete';

import { searchCountryRegions } from '../../helpers';
import { IAddressCountry } from '../../interfaces/address-country.interface';
import { IAddressRegion } from '../../interfaces/address-region.interface';
import { Country } from '../../enums/country.enum';


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
    }
  ],
})
export class FsAddressRegionComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public region: string;
  @Input() public countries = [];
  @Input() public disabled = false;
  @Input() public label;
  @Input() public required = false;

  @Input()
  public regionCountryOrder = ['CA', 'US'];

  @Output() public regionChange = new EventEmitter<string>();

  @Input('country')
  public set country(value) {
    this._country = value;
    this.updateCountryRegionLabels();
  }

  public model;

  public controlName = `region_${guid('xxxxxx')}`
  public regionLabel;
  public canadaCountryItem: IAddressCountry;
  public usCountryItem: IAddressCountry;
  public canadaRegions: IAddressRegion[];
  public usRegions: IAddressRegion[];
  public canadaRegionsIsFirst = false;
  public countryEnum = Country;

  @ViewChild(FsAutocompleteComponent, { read: NgModel, static: true})
  private _autocompleteModel: NgModel;

  private _country;
  private _destroy$ = new Subject<void>();

  constructor(private _cdRef: ChangeDetectorRef) { }

  public get country(): string {
    return this._country;
  }

  public ngOnInit() {
    this._detectCountriesOrder();
    this._initCanadaItems();
    this._initUsItems();
    this.updateCountryRegionLabels();
    this._listenControlStateChanges();
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
              ]
            }

            case Country.UnitedStates: {
              return [
                ...usMatches,
                ...canadaMatches,
              ]
            }

            default: {
              if (this.canadaRegionsIsFirst) {
                return [
                  ...canadaMatches,
                  ...usMatches,
                ];
              } else {
                return [
                  ...usMatches,
                  ...canadaMatches,
                ];
              }
            }
          }
        }),
      )
  }

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
