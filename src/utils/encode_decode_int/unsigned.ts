const LIMIT = BigInt(0x7f);

const zeroBI = BigInt(0);
const sevenBI = BigInt(7);

export function encodingLength(value: bigint): number {
  let i = 0;

  for (; value >= BigInt(0x80); i++) {
    value >>= sevenBI;
  }

  return i + 1;
}

export function encode(
  i: bigint,
  buffer?: ArrayBuffer,
  byteOffset?: number,
): Uint8Array {
  if (i < zeroBI) {
    throw new RangeError('value must be unsigned');
  }

  const byteLength = encodingLength(i);
  buffer = buffer || new ArrayBuffer(byteLength);
  byteOffset = byteOffset || 0;
  if (buffer.byteLength < byteOffset + byteLength) {
    throw new RangeError(
      'the buffer is too small to encode the number at the offset',
    );
  }

  const array = new Uint8Array(buffer, byteOffset);

  let offset = 0;
  while (LIMIT < i) {
    array[offset++] = Number(i & LIMIT) | 0x80;
    i >>= sevenBI;
  }

  array[offset] = Number(i);

  return array;
}

export function decode(data: Uint8Array, offset = 0): bigint {
  let i = zeroBI;
  let n = 0;
  let b: number;
  do {
    b = data[offset + n];
    if (b === undefined) {
      throw new RangeError('offset out of range');
    }

    i += BigInt(b & 0x7f) << BigInt(n * 7);
    n++;
  } while (0x80 <= b);
  return i;
}
