export interface FsAddress {
  id?: string | number;
  name?: string;
  description?: string;
  country?: string;
  region?: string;
  city?: string;
  street?: string;
  address2?: string;
  address3?: string;
  zip?: string;
  lat?: number;
  lng?: number;
  /**
   * IANA timezone identifier for the place (e.g. `America/Toronto`).
   *
   * Only ever populated via the NEW Places API, which the component uses by default
   * and falls back off of when the key lacks "Places API (New)". On that fallback
   * this stays empty: the legacy `PlacesService` returns a bare UTC offset, which
   * can't express DST, so it is deliberately not mapped rather than set wrong.
   * Never a user-editable input; it rides along as a payload passenger.
   */
  timezone?: string;
}
