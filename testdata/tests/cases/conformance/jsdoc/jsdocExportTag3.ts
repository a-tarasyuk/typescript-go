// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /types.d.ts
export interface I {
    a: number
}

// @filename: /a.js
/** @export { I } from "./types" */

// @filename: /b.js
/** @import { I } from "./a" */

/** @type {I} */
export const a = {
    a: 1
};

/** @type {I} */
export const b = {
    a: ""
};
