import { AddressFormat } from '../enums/address-format.enum';
import { addressFormat } from './address-format';


export function addressOneLineFormat(address, options: { includeFirst?: number }= {}) {

  const addressOptions: any = {
    format: AddressFormat.OneLine,
    ...options,
  };

  return addressFormat(address, addressOptions);
}
