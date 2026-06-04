// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /a.js
class C {}
/** @export { C } */

// @filename: /b.js
/** @import { C } from "./a" */

/** @type {C | undefined} */
export let c;
