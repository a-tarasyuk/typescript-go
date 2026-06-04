// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true

// @filename: /types.d.ts
export interface I {}

// @filename: /a.js
/** @export * as ns from "./types" */

// @filename: /b.js
/** @import { ns } from "./a" */

/** @type {ns.I | undefined} */
export let value;
