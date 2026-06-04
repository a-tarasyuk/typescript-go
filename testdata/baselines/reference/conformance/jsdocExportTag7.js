//// [tests/cases/conformance/jsdoc/jsdocExportTag7.ts] ////

//// [types.d.ts]
export interface I {}

//// [a.js]
/**
 * @export {
 *   I,
 *   I as I2,
 *   I as default
 * } from "./types"
 */

//// [b.js]
/** @import { I, I2 } from "./a" */
/** @import D from "./a" */

/** @type {I | I2 | D | undefined} */
export let value;




//// [a.d.ts]
export type { I, I as I2, I as default } from "./types";
/**
 * @export {
 *   I,
 *   I as I2,
 *   I as default
 * } from "./types"
 */
//// [b.d.ts]
/** @import { I, I2 } from "./a" */
/** @import D from "./a" */
import type { I, I2 } from "./a";
import type D from "./a";
/** @type {I | I2 | D | undefined} */
export declare let value: I | I2 | D | undefined;
