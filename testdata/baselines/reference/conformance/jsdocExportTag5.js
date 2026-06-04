//// [tests/cases/conformance/jsdoc/jsdocExportTag5.ts] ////

//// [types.d.ts]
export interface I {}

//// [a.js]
/** @export * from "./types" */

//// [b.js]
/** @import { I } from "./a" */

/** @type {I | undefined} */
export let value;




//// [a.d.ts]
export type * from "./types";
/** @export * from "./types" */
//// [b.d.ts]
/** @import { I } from "./a" */
import type { I } from "./a";
/** @type {I | undefined} */
export declare let value: I | undefined;
