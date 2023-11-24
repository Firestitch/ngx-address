import { IAddressCountry } from '../interfaces/address-country.interface';
import { IAddressRegion } from '../interfaces/address-region.interface';


export function searchCountryRegions(
  text: string,
  regions: IAddressRegion[] | IAddressCountry[],
  limit?: number,
): IAddressRegion[] {
  let matches = [];

  text = text.toLowerCase().trim();
  regions.forEach((region) => {
    const regionName = region.name.toLowerCase().trim();
    const index = regionName.indexOf(text);

    if (index > -1) {
      matches.push({
        index,
        region,
      });
    }
  });

  matches.sort((a, b) => {
    if (a.index < b.index) {
      return -1;
    } else if (a.index > b.index) {
      return 1;
    }

    return 0;

  });

  if (limit) {
    matches = matches.slice(0, limit);
  }

  return matches.map((match) => match.region);
}
