//// [tests/cases/conformance/jsdoc/jsdocExportTag8.ts] ////

//// [a.js]
/**
 * @typedef {{ value: string }} T
 */

/** @export { T } */

//// [b.js]
/** @import { T } from "./a" */

/** @type {T} */
export const a = { value: "" };

/** @type {T} */
export const b = { value: 1 };




//// [a.d.ts]
/**
 * @typedef {{ value: string }} T
 */
type T = {
    value: string;
};
export type { T };
/** @export { T } */
//// [b.d.ts]
/** @import { T } from "./a" */
import type { T } from "./a";
/** @type {T} */
export declare const a: T;
/** @type {T} */
export declare const b: T;
