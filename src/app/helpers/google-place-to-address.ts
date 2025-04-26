import { createEmptyAddress } from './create-empty-address';
import { FsAddressConfig } from '../interfaces/address-config.interface';
import { FsAddress } from '../interfaces/address.interface';


export function googlePlaceToFsAddress(
  result: google.maps.places.Place,
  config: FsAddressConfig,
): FsAddress {
  const address = createEmptyAddress();

  let countryLongName: string, regionLongName: string, streetShortName: string;

  address.lat = result.location.lat();
  address.lng = result.location.lng();
  address.description = result.formattedAddress;

  // Finding different parts of address
  result.addressComponents.forEach((item) => {
    if (item.types.some(type => type === 'country')) {
      address.country = item.shortText;
      countryLongName = item.longText;
    }

    if (item.types.some(type => type === 'administrative_area_level_1')) {
      address.region = item.shortText;
      regionLongName = item.longText;
    }

    if (item.types.some(type => type === 'locality' || type === 'political')) {
      address.city = item.longText;
    }

    if (item.types.some(type => type === 'postal_code')) {
      address.zip = item.longText;
    }
  });

  // Address.Street consists from number and street
  const streetNumber = result.addressComponents
    .find(el => el.types.some(type => type === 'street_number'));

  if (streetNumber) {
    address.street = streetNumber.longText + ' ';
    streetShortName = streetNumber.longText + ' ';
  } else {
    const match = address.description.match(/^[\d-]+/);
    if (match) {
      address.street = match[0] + ' ';
      streetShortName = match[0] + ' ';
    }
  }

  const streetAddress = result.addressComponents
    .find(el => el.types.some(type => type === 'route'));

  if (streetAddress) {
    if (!address.street) {
      address.street = streetAddress.longText;
      streetShortName = streetAddress.shortText;
    } else {
      address.street += streetAddress.longText;
      streetShortName += streetAddress.shortText;
    }
  }

  // Checking correct place NAME
  if (
    address.country !== result.displayName
    && countryLongName !== result.displayName
    && address.region !== result.displayName
    && regionLongName !== result.displayName
    && address.city !== result.displayName
    && streetShortName !== result.displayName
    && address.zip !== result.displayName
    && address.street !== result.displayName
  ) {
    if (config.name && config.name.visible !== false) {
      address.name = result.displayName;
    }

  } else {
    address.name = '';
  }

  return address;
}
