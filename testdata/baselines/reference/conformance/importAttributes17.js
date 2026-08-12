//// [tests/cases/conformance/importAttributes/importAttributes17.ts] ////

//// [a.ts]
declare module "*.css" with { type: "css" } {
    const a: { kind: "a" };
    export default a;
}

//// [b.ts]
export { default as a } from "./a.css" with { type: "css" };


//// [a.js]
"use strict";
//// [b.js]
export { default as a } from "./a.css" with { type: "css" };
