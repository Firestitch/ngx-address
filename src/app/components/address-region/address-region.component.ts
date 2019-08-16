import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output,
  SimpleChange
} from '@angular/core';

@Component({
  selector: 'fs-address-region',
  templateUrl: './address-region.component.html',
  styleUrls: ['./address-region.component.scss'],
})
export class FsAddressRegionComponent implements OnInit {

  @Input() public region: string;
  @Input() public countries = [];
  @Input() public disabled = false;
  @Input() public required = false;
  @Output() public regionChange = new EventEmitter<string>();
  @Input('country') set country(value) {
    this._country = value;
    this.initRegions();
    this.updateCountryRegionLabels();
  }

  private _country;
  public regions: { code: string, name: string }[] = [];
  public regionLabel = 'Province/State';

  public ngOnInit() {
    this.initRegions();
    this.updateCountryRegionLabels();
  }

  private initRegions() {
    if (this._country) {
      const country = this.countries.find(countryEl => countryEl.code === this._country);
      if (country) {
        this.regions = country.regions || [];
      }
    }
  }

  public updateCountryRegionLabels() {
    this.regionLabel = this._country === 'CA'
      ? 'Province'
      : this._country === 'US' ? 'State' : 'Province/State';
  }

  public changeRegion() {
    const country = this.countries.find((countryEl) =>  countryEl.code === this._country);

    if (country && country.regions) {
      const region = country.regions.find((regionEl) => regionEl.code === this.region);
      this.region = region.code;
    }
    this.regionChange.emit(this.region);
  }
}
