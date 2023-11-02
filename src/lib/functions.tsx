export function dateReviver(key: string, value: any) {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
    // Check if the string matches the ISO 8601 date format
    return new Date(value);
  }
  return value;
}