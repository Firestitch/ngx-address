import { createEmptyAddress } from './create-empty-address';
import { IFsAddressConfig } from '../interfaces/address-config.interface';
import { FsAddress } from '../interfaces/address.interface';


export function googleDetailsToAddress(
  result: google.maps.places.PlaceResult,
  config: IFsAddressConfig,
): FsAddress {
  const address = createEmptyAddress();
  let countryLongName, regionLongName, streetShortName;

  address.lat = result.geometry.location.lat();
  address.lng = result.geometry.location.lng();

  // Finding different parts of address
  result.address_components.forEach((item) => {
    if (item.types.some(type => type === 'country')) {
      address.country = item.short_name;
      countryLongName = item.long_name;
    }

    if (item.types.some(type => type === 'administrative_area_level_1')) {
      address.region = item.short_name;
      regionLongName = item.long_name;
    }

    if (item.types.some(type => type === 'locality')) {
      address.city = item.long_name;
    }

    if (item.types.some(type => type === 'postal_code')) {
      address.zip = item.long_name;
    }
  });

  // Address.Street consists from number and street
  const streetNumber = result.address_components
    .find(el => el.types.some(type => type === 'street_number'));

  if (streetNumber) {
    address.street = streetNumber.long_name + ' ';
    streetShortName = streetNumber.long_name + ' ';
  } else {
    const match = address.description.match(/^[\d-]+/);
    if (match) {
      address.street = match[0] + ' ';
      streetShortName = match[0] + ' ';
    }
  }

  const streetAddress = result.address_components
    .find(el => el.types.some(type => type === 'route'));

  if (streetAddress) {
    if (!address.street) {
      address.street = streetAddress.long_name;
      streetShortName = streetAddress.short_name;
    } else {
      address.street += streetAddress.long_name;
      streetShortName += streetAddress.short_name;
    }
  }

  // Checking correct place NAME
  if (
    address.country !== result.name
    && countryLongName !== result.name
    && address.region !== result.name
    && regionLongName !== result.name
    && address.city !== result.name
    && streetShortName !== result.name
    && address.zip !== result.name
    && address.street !== result.name
  ) {
    if (config.name && config.name.visible !== false) {
      address.name = result.name;
    }

  } else {
    address.name = '';
  }

  return address;
}
