export default function countryFormatter(str: string): string {
  return str === 'Belarus' ? 'BY' : str.slice(0, 2).toUpperCase();
}
