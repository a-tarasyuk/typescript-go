//// [tests/cases/conformance/jsdoc/jsdocExportTag1.ts] ////

//// [a.js]
class C {}
/** @export { C } */

//// [b.js]
/** @import { C } from "./a" */

/** @type {C | undefined} */
export let c;




//// [a.d.ts]
declare class C {
}
export type { C };
/** @export { C } */
//// [b.d.ts]
/** @import { C } from "./a" */
import type { C } from "./a";
/** @type {C | undefined} */
export declare let c: C | undefined;
