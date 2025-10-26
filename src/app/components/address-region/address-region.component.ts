import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, ViewChild, inject } from '@angular/core';
import { ControlContainer, NgForm, NgModel, FormsModule } from '@angular/forms';


import { FsAutocompleteComponent, FsAutocompleteModule } from '@firestitch/autocomplete';
import { guid } from '@firestitch/common';
import { controlContainerFactory } from '@firestitch/core';

import { Subject, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Countries } from '../../consts';
import { Country } from '../../enums/country.enum';
import { IAddressCountry } from '../../interfaces/address-country.interface';
import { IAddressRegion } from '../../interfaces/address-region.interface';
import { FsFormModule } from '@firestitch/form';


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
    standalone: true,
    imports: [
        FsAutocompleteModule,
        FormsModule,
        FsFormModule,
    ],
})
export class FsAddressRegionComponent implements OnInit, OnDestroy {
  private _cdRef = inject(ChangeDetectorRef);


  @ViewChild(FsAutocompleteComponent, { read: NgModel, static: true })
  public autocompleteModel: NgModel;

  @Input() public set region(regionCode: string) {
    const region = this.addressCountries
      .reduce((accum, addressCountry) => {
        return [
          ...accum,
          ...(addressCountry.regions || [])
            .filter((addressRegion) => (
              addressRegion.code === regionCode &&
              (!this.country || this.country === addressCountry.code)),
            ),
        ];
      }, [])[0];

    this.regionModel = (region ? region : (regionCode ? { name: regionCode } : null));
  }

  public get region() {
    return this.regionModel?.code;
  }

  @Input() public disabled = false;
  @Input() public country: Country | string;
  @Input() public label;
  @Input() public required = false;
  @Input() public regionCountryOrder = [Country.Canada, Country.UnitedStates];
  @Input() public set countries(countryCodes: (string | Country)[]) {
    countryCodes = countryCodes || [Country.Canada, Country.UnitedStates];
    this._countries = countryCodes
      .map((countryCode: string) => {
        return Countries.find((country) => country.code === countryCode);
      });

    this.updateCountryRegionLabels();
  }

  public get addressCountries() {
    return this._countries;
  }

  @Output() public regionChange = new EventEmitter<string>();

  public regionModel: IAddressRegion;
  public controlName = `region${guid('xxxxxx')}`;
  public regionLabel: string;
  public countryEnum = Country;

  private _countries: IAddressCountry[] = [];
  private _destroy$ = new Subject<void>();

  constructor() {
    this.countries = [Country.Canada, Country.UnitedStates];
  }

  public ngOnInit() {
    this.updateCountryRegionLabels();
    this._listenControlStateChanges();
  }

  public clear() {
    this.regionModel = null;
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public fetch = (keyword: string) => {
    keyword = keyword.toLowerCase();

    return of(null)
      .pipe(
        map(() => {
          const regions: IAddressRegion[] = this._countries
            .reduce((accum, country) => {
              const countryRegions = (country.regions || [])
                .filter((region) => {
                  const regionName = region.name.toLowerCase().trim();

                  return regionName.indexOf(keyword) !== -1;
                });

              if (countryRegions.length ) {
                console.log(country, keyword, countryRegions);
              }

              return [
                ...accum,
                ...countryRegions
                  .map((countryRegion) => {
                    return {
                      ...countryRegion,
                      country: country.name,
                    };
                  }),
              ];
            }, []);
          console.log(regions, keyword);

          return regions;
        }),
      );
  };

  public displayWith = (data) => {
    return data?.name;
  };

  public selectUserOption(keyword) {
    this.regionModel = {
      code: keyword,
      name: keyword,
    };

    this.autocompleteModel.control.markAsDirty();

    this.regionChange.emit(keyword);
  }

  public regionChanged() {
    this.regionChange.emit(this.regionModel?.code);
  }

  public justUseShow = (keyword) => {
    return !!keyword;
  };

  public updateCountryRegionLabels() {
    this.regionLabel = this.label ? this.label : Object.keys(
      this._countries
        .reduce((accum, country) => {
          return {
            ...accum,
            [country.regionLabel || 'Province']: true,
          };
        }, {}),
    )
      .join('/');
  }

  // we need this to get updated ng-(invalid/dirty) classes
  private _listenControlStateChanges(): void {
    this.autocompleteModel
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
