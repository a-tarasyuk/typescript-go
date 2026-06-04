//// [tests/cases/conformance/jsdoc/jsdocExportTag2.ts] ////

//// [a.js]
class C {}
/** @export { C, C as C2, C as default } */

//// [b.js]
/** @import { C, C2 } from "./a" */
/** @import D from "./a" */

/** @type {C} */
export const a = 1;

/** @type {C2} */
export const b = 1;

/** @type {D} */
export const c = 1;




//// [a.d.ts]
declare class C {
}
export type { C, C as C2, C as default };
/** @export { C, C as C2, C as default } */
//// [b.d.ts]
/** @import { C, C2 } from "./a" */
/** @import D from "./a" */
import type { C, C2 } from "./a";
import type D from "./a";
/** @type {C} */
export declare const a: C;
/** @type {C2} */
export declare const b: C2;
/** @type {D} */
export declare const c: D;
