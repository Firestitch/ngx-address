import { IAddressRegion } from '../interfaces/address-region.interface';

export function searchRegions(text: string, regions: IAddressRegion[], limit: number): IAddressRegion[] {
  let matches = [];

  text = text.toLowerCase().trim();
  regions.forEach((region) => {
    const regionName = region.name.toLowerCase().trim();
    const index = regionName.indexOf(text);

    if (index > -1) {
      matches.push({
        index: index,
        region: region,
      });
    }
  });

  matches.sort((a, b) => {
    if (a.index < b.index) {
      return -1;
    } else if (a.index > b.index) {
      return 1;
    } else {
      return 0;
    }
  });

  if (limit) {
    matches = matches.slice(0, limit);
  }

  return matches.map((match) => match.region);
}
