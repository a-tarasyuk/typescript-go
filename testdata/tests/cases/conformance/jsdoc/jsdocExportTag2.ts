// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /a.js
class C {}
/** @export { C, C as C2, C as default } */

// @filename: /b.js
/** @import { C, C2 } from "./a" */
/** @import D from "./a" */

/** @type {C} */
export const a = 1;

/** @type {C2} */
export const b = 1;

/** @type {D} */
export const c = 1;
