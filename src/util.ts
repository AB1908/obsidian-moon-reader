export default function integerToRGBA( number: number): string {
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  const ARGB = number.toString(16).toUpperCase();

  return `${ARGB.slice(2,)}${ARGB.slice(0, 2)}`;
}