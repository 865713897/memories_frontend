// 生成uuid
export function uuid(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuidArray = [];
  const _radix = radix || chars.length;
  if (len) {
    // Compact form
    for (let i = 0; i < len; i += 1) uuidArray[i] = chars[0 | (Math.random() * _radix)];
  } else {
    // rfc4122, version 4 form
    let r;
    // rfc4122 requires these characters
    uuidArray[8] = '-';
    uuidArray[13] = '-';
    uuidArray[18] = '-';
    uuidArray[23] = '-';
    uuidArray[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i += 1) {
      if (!uuidArray[i]) {
        r = 0 | (Math.random() * 16);
        uuidArray[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuidArray.join('');
}
