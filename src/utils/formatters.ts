export function filterAlphaOnly(str: string): string {
  return str.replace(/[^a-zA-Z]/g, "");
}
