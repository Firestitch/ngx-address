
export function addressSummaryFormat(address) {

  const parts = ['name', 'street', 'address2', 'address3', 'city', 'region', 'country'];
  const addressParts = [];

  if (address) {
    for ( let i = 0; i < parts.length; i++) {
      const field = parts[i];
      const part = address[field];

      if (field === 'name' && part) {
        addressParts.push(part);

      } else if (part && field !== 'name') {
        addressParts.push(part);

        const nextPart = address[parts[i + 1]];
        if (nextPart) {
          addressParts.push(nextPart);
        }
      }
    }
  }

  return addressParts.join(', ');
}
