// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /a.js
/**
 * @typedef {{ value: string }} T
 */

/** @export { T } */

// @filename: /b.js
/** @import { T } from "./a" */

/** @type {T} */
export const a = { value: "" };

/** @type {T} */
export const b = { value: 1 };
