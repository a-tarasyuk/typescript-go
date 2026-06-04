//// [tests/cases/conformance/jsdoc/jsdocExportTag3.ts] ////

//// [types.d.ts]
export interface I {
    a: number
}

//// [a.js]
/** @export { I } from "./types" */

//// [b.js]
/** @import { I } from "./a" */

/** @type {I} */
export const a = {
    a: 1
};

/** @type {I} */
export const b = {
    a: ""
};




//// [a.d.ts]
export type { I } from "./types";
/** @export { I } from "./types" */
//// [b.d.ts]
/** @import { I } from "./a" */
import type { I } from "./a";
/** @type {I} */
export declare const a: I;
/** @type {I} */
export declare const b: I;
