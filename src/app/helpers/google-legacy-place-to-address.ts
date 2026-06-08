import { createEmptyAddress } from './create-empty-address';
import { FsAddressConfig } from '../interfaces/address-config.interface';
import { FsAddress } from '../interfaces/address.interface';


/**
 * Convert a result from the LEGACY Places API (`PlacesService.getDetails`,
 * a `google.maps.places.PlaceResult`) into an FsAddress.
 *
 * This mirrors `googlePlaceToFsAddress` (which handles the NEW `Place` shape),
 * but reads the legacy snake_case fields — `place_id`, `address_components`
 * with `long_name`/`short_name`, `geometry.location`, `formatted_address`.
 */
export function googleLegacyPlaceToFsAddress(
  result: google.maps.places.PlaceResult,
  _config: FsAddressConfig,
): FsAddress {
  const address = createEmptyAddress();

  address.id = result.place_id;
  address.name = result.name;
  address.lat = result.geometry?.location?.lat();
  address.lng = result.geometry?.location?.lng();
  address.description = result.formatted_address;

  const components = result.address_components ?? [];

  // Finding different parts of address
  components.forEach((item) => {
    if (item.types.some((type) => type === 'country')) {
      address.country = item.short_name;
    }

    if (item.types.some((type) => type === 'administrative_area_level_1')) {
      address.region = item.short_name;
    }

    if (item.types.some((type) => type === 'locality' || type === 'political')) {
      address.city = item.long_name;
    }

    if (item.types.some((type) => type === 'postal_code')) {
      address.zip = item.long_name;
    }
  });

  // Address.Street consists from number and street
  const streetNumber = components
    .find((el) => el.types.some((type) => type === 'street_number'));

  if (streetNumber) {
    address.street = streetNumber.long_name + ' ';
  } else if (address.description) {
    const match = address.description.match(/^[\d-]+/);
    if (match) {
      address.street = match[0] + ' ';
    }
  }

  const route = components
    .find((el) => el.types.some((type) => type === 'route'));

  if (route) {
    if (!address.street) {
      address.street = route.long_name;
    } else {
      address.street += route.long_name;
    }
  }

  return address;
}
