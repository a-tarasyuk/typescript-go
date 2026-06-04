// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /types.d.ts
export interface I {}

// @filename: /a.js
/** @export * from "./types" */

// @filename: /b.js
/** @import { I } from "./a" */

/** @type {I | undefined} */
export let value;
