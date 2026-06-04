import { FsAddress } from '../interfaces/address.interface';


export function createEmptyAddress(): FsAddress {
  return {
    id: null,
    name: '',
    description: '',
    country: '',
    region: '',
    city: '',
    street: '',
    address2: '',
    address3: '',
    zip: '',
    lat: null,
    lng: null,
  };
}
