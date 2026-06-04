import { createEmptyAddress } from './create-empty-address';
import { FsAddressConfig } from '../interfaces/address-config.interface';
import { FsAddress } from '../interfaces/address.interface';


export function googlePlaceToFsAddress(
  result: google.maps.places.Place,
  _config: FsAddressConfig,
): FsAddress {
  const address = createEmptyAddress();

  address.id = result.id;
  address.name = result.displayName;
  address.lat = result.location.lat();
  address.lng = result.location.lng();
  address.description = result.formattedAddress;

  // Finding different parts of address
  result.addressComponents.forEach((item) => {
    if (item.types.some(type => type === 'country')) {
      address.country = item.shortText;
    }

    if (item.types.some(type => type === 'administrative_area_level_1')) {
      address.region = item.shortText;
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
  } else {
    const match = address.description.match(/^[\d-]+/);
    if (match) {
      address.street = match[0] + ' ';
    }
  }

  const streetAddress = result.addressComponents
    .find(el => el.types.some(type => type === 'route'));

  if (streetAddress) {
    if (!address.street) {
      address.street = streetAddress.longText;
    } else {
      address.street += streetAddress.longText;
    }
  }

  return address;
}
