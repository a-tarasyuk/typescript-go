// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /types.d.ts
export interface I {}

// @filename: /a.js
/**
 * @export {
 *   I,
 *   I as I2,
 *   I as default
 * } from "./types"
 */

// @filename: /b.js
/** @import { I, I2 } from "./a" */
/** @import D from "./a" */

/** @type {I | I2 | D | undefined} */
export let value;
