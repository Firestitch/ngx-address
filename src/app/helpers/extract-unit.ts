export function extractUnit(text: string) {
  const primaryUnitRegex = /((unit|apt|#)\s?#?\d+([,.])?(\w)?([,.])?)/gi;
  const secondaryUnitRegex = /-\s?\d+/gi;
  const nonWordOrDigitChar = /^[^a-z\d]*|[^a-z\d]*$/gi;

  let unit = [
    ...(text.match(primaryUnitRegex) || []),
    ...(text.match(secondaryUnitRegex) || []),
  ][0];

  if (unit) {
    text = text
      .replace(unit, '')
      .trim();

    unit = unit.replace(nonWordOrDigitChar, '').trim();
  }

  text = text.replace(nonWordOrDigitChar, '').trim();

  return {
    text,
    unit,
  };
}
