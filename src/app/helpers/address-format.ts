import { AddressFormat } from './../enums/address-format.enum';


export function addressFormat(
  address,
  options: {
    format?: AddressFormat;
    includeFirst?: number;
  } = {}): string {

  options = {
    format: AddressFormat.OneLine,
    ...options,
  };

  const parts = ['name', 'street', 'address2', 'address3', 'city', 'region', 'zip', 'country'];
  let addressParts = [];
  let lines = [];

  if (address) {
    parts.forEach((part) => {
      if (address[part]) {
        addressParts.push(address[part]);
      }
    });
  }

  if (options.includeFirst) {
    addressParts = addressParts.slice(0, options.includeFirst);
  }

  if (addressParts.length) {
    if (options.format === AddressFormat.TwoLine) {
      lines = [[addressParts.shift()]];
    }

    lines.push(addressParts);
  }

  return lines
    .map((line) => {
      return line.join(', ');
    })
    .join('\n');
}
