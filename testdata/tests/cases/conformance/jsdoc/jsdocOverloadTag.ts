// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true
// @filename: a.js

const f1 =
/**
 * @template T
 * @param {T} value
 * @param {T=} other
 *
 * @overload
 * @param {T} value
 * @return {T}
 *
 * @overload
 * @param {T} value
 * @param {T} other
 * @return {T}
 */ (value, other) => value;

/**
 * @template T
 * @param {T} value
 * @param {T=} other
 *
 * @overload
 * @param {T} value
 * @return {T}
 *
 * @overload
 * @param {T} value
 * @param {T} other
 * @return {T}
 */
function f2(value, other) {
    return value;
}
