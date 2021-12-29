const symbols = "0123456789abcdef";
const table: string[] = [];

// Create lookup table
for (const s1 of symbols) {
  for (const s2 of symbols) {
    table.push(s1 + s2);
  }
}

/**
 * Converts a byte array to a hexadecimal string.
 * The resulting string has an even length with lowercase symbols.
 * Returns an empty string for an empty byte array.
 *
 * @param buffer Byte array
 */
export function stringify(buffer: Uint8Array): string {
  let result = "";
  for (let index = 0; index < buffer.length; ++index) {
    result += table[buffer[index]];
  }
  return result;
}

/**
 * Parse a byte array from a hexadecimal string.
 * Returns an empty byte array for an empty string.
 *
 * Throws `SyntaxError` if a non-hexadecimal symbol is encountered.
 *
 * @param hex Hexadecimal string
 */
export function parse(hex: string): Uint8Array {
  const normalHex = hex.length % 2 ? "0" + hex : hex;
  const result = new Uint8Array(normalHex.length / 2);
  for (let offset = 0; offset < result.length; ++offset) {
    const index = offset << 1;
    const c1 = normalHex.charCodeAt(index);
    const c2 = normalHex.charCodeAt(index | 1);
    const n1 = c1 - (c1 < 58 ? 48 : c1 > 87 ? 87 : 55);
    const n2 = c2 - (c2 < 58 ? 48 : c2 > 87 ? 87 : 55);
    if (n1 >> 4 || n2 >> 4) {
      throw new SyntaxError("Invalid hexadecimal string");
    }
    result[offset] = (n1 << 4) | n2;
  }
  return result;
}
