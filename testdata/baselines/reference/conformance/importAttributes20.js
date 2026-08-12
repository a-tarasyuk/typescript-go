//// [tests/cases/conformance/importAttributes/importAttributes20.ts] ////

//// [a.ts]
declare module "*.css" {
    const a: { kind: "a" };
    export default a;
}

declare module "*.css" with { type: "css" } {
    const b: { kind: "b" };
    export const d: true;
    export default b;
}

//// [b.ts]
import a, { c } from "a.css";
import b, { d } from "a.css" with { type: "css" };

a satisfies { kind: "a" };
b satisfies { kind: "b" };
c satisfies true;
d satisfies true;

//// [c.ts]
export {};

declare module "a.css" {
    export const c: true;
}


//// [a.js]
"use strict";
//// [b.js]
import a, { c } from "a.css";
import b, { d } from "a.css" with { type: "css" };
a;
b;
c;
d;
//// [c.js]
export {};
