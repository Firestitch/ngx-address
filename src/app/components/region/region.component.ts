import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output,
  SimpleChange
} from '@angular/core';

@Component({
  selector: 'fs-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
})
export class FsRegionComponent implements OnInit, OnChanges {
  @Input() public region: string;
  @Input() public country: string;
  @Input() public countries = [];
  @Input() public disabled = false;
  @Input() public required = false;

  @Output() public regionChange = new EventEmitter<string>();

  public regions: { code: string, name: string }[] = [];
  public regionLabel = 'Province/State';

  constructor() {

  }

  public ngOnChanges(changes: { country: SimpleChange }) {
    if (changes.country && !changes.country.firstChange) {
      const currentCountry = changes.country.currentValue || null;
      const previousCountry = changes.country.previousValue || null;
      if (currentCountry !== previousCountry) {
        this.initRegions();
        this.updateCountryRegionLabels();
      }
    }
  }

  public ngOnInit() {
    this.initRegions();
    this.updateCountryRegionLabels();
  }

  private initRegions() {
    if (this.country) {
      const country = this.countries.find(countryEl => countryEl.code === this.country);
      if (country) {
        this.regions = country.regions || [];
      }
    }
  }

  private updateCountryRegionLabels() {
    this.regionLabel = this.country === 'CA'
      ? 'Province'
      : this.country === 'US' ? 'State' : 'Province/State';
  }

  public changeRegion() {
    const country = this.countries.find((countryEl) =>  countryEl.code === this.country);

    if (country && country.regions) {
      const region = country.regions.find((regionEl) => regionEl.code === this.region);
      this.region = region.code;
    }
    this.regionChange.emit(this.region);
  }


}
