//// [tests/cases/conformance/jsdoc/jsdocExportTag6.ts] ////

//// [types.d.ts]
export interface I {}

//// [a.js]
/** @export * as ns from "./types" */

//// [b.js]
/** @import { ns } from "./a" */

/** @type {ns.I | undefined} */
export let value;




//// [a.d.ts]
export type * as ns from "./types";
/** @export * as ns from "./types" */
//// [b.d.ts]
/** @import { ns } from "./a" */
import type { ns } from "./a";
/** @type {ns.I | undefined} */
export declare let value: ns.I | undefined;
