/**
 * Add int pixels to a css style (left or top generally)
 * @param  {string} style Style string in css format
 * @param  {number} diff The pixels to add/subtract
 * @returns {string} Style as string for css use
 */
export function sumStyle(style, diff) {
  return intToPix(pixToInt(style) + diff);
}
/**
 * Converts a pixel string to an int
 * @param  {string} pix Pixel string
 * @return {number} Integer value of the pixel string
 */
export function pixToInt(pix) {
  return parseInt(pix.replace('px', ''));
}
/**
 * Convert integer to pixel string.
 * If not an integer the input is returned as is
 * @param  {number} int Integer value
 * @returns {string} Pixel string
 */
export function intToPix(int) {
  if (int === Number(int)) return int + 'px';
  return int;
}

/**
 * Convert a decimal color to a hex reprezentation.
 * If a string the input is returned as is.
 *
 * @param {*} color string or integer
 * @returns {string} color hex reprezentation as string
 */
export function getHexColorString(color) {
  if (typeof color === 'string') {
    return color;
  }
  let hex = color.toString(16);
  return '#' + hex.padStart(6, '000000');
}

/**
 * @param {*} color hex (string) or decimal reprezentation
 * @param {number} percent
 * @returns a lighter color
 */
export function adjustBrightness(color, percent) {
  if (typeof color === 'number') {
    color = getHexColorString(color);
  }
  return (
    '#' +
    _(color.replace('#', ''))
      .chunk(2)
      .map(v => parseInt(v.join(''), 16))
      .map(v => (0 | ((1 << 8) + v + ((256 - v) * percent) / 100)).toString(16).substr(1))
      .join('')
  );
}
