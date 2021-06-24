import { FsAddress } from '../interfaces/address.interface';

export function addressIsEmpty(value: FsAddress): boolean {
  return !value
    || (!value.name
      && !value.street
      && !value.city
      && !value.region
      && !value.zip
      && !value.country
    )
}
