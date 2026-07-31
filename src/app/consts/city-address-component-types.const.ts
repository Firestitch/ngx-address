/**
 * Google address-component types that carry a city, most specific first.
 *
 * Only these types mean "city". Google tags nearly every geographic component
 * `political` — including `country` — so matching that tag resolves the country
 * as the city.
 *
 * `postal_town` is required, not defensive: UK addresses have no `locality`
 * component at all and express the city this way (10 Downing St returns
 * `street_number, route, postal_town=London, administrative_area_level_2,
 * administrative_area_level_1, country, postal_code`).
 */
export const CityAddressComponentTypes: string[] = [
  'locality',
  'postal_town',
];
