import { IAddressRegion } from './address-region.interface';

export interface IAddressCountry {
  code: string;
  name: string;
  regions?: IAddressRegion[];
}
