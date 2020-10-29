import { AddressFormat } from '../enums/address-format.enum';
import { addressFormat } from './address-format';


export function addressTwoLineFormat(address, options: { includeFirst?: number }= {}) {

  const addressOptions: any = {
    format: AddressFormat.TwoLine,
    ...options,
  };

  return addressFormat(address, addressOptions);
}
