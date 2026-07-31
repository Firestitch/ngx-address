import { createEmptyAddress } from './create-empty-address';
import { CityAddressComponentTypes } from '../consts/city-address-component-types.const';
import { FsAddressConfig } from '../interfaces/address-config.interface';
import { FsAddress } from '../interfaces/address.interface';


/**
 * `Place.timeZone` is a newer Places field carrying the IANA identifier. The
 * @types/google.maps version resolved here (3.58) predates it and declares only
 * `utcOffsetMinutes`, so it is typed narrowly at the read rather than forcing a
 * types bump on every consumer of this library.
 */
type PlaceWithTimeZone = google.maps.places.Place & { timeZone?: { id?: string } };

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
  address.timezone = (result as PlaceWithTimeZone).timeZone?.id;

  // Finding different parts of address
  result.addressComponents.forEach((item) => {
    if (item.types.some(type => type === 'country')) {
      address.country = item.shortText;
    }

    if (item.types.some(type => type === 'administrative_area_level_1')) {
      address.region = item.shortText;
    }

    if (item.types.some(type => type === 'postal_code')) {
      address.zip = item.longText;
    }
  });

  // Resolved outside the loop above on purpose: assigning the city per-component
  // lets the LAST match win, and Google tags the country `political` too, so the
  // country overwrites the real city. Take the first city-bearing type instead.
  const cityComponent = CityAddressComponentTypes
    .map(cityType => result.addressComponents.find(el => el.types.some(type => type === cityType)))
    .find(Boolean);

  if (cityComponent) {
    address.city = cityComponent.longText;
  }

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
