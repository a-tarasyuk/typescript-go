//// [tests/cases/conformance/importAttributes/importAttributes18.ts] ////

//// [a.ts]
declare module "*.css" with { type: "css" } {
    const a: { kind: "a" };
    export default a;
}

declare module "a:b" with { type: "json", mode: "raw" } {
    const b: { kind: "b" };
    export default b;
}

//// [b.ts]
declare module "*.css" with { type: "css" } {
    export const c: true;
}

declare module "a:b" with { mode: "raw", type: "json" } {
    export const d: true;
}

//// [c.ts]
import a, { c } from "./a.css" with { type: "css" };
import b, { d } from "a:b" with { type: "json", mode: "raw" };

a satisfies { kind: "a" };
b satisfies { kind: "b" };
c satisfies true;
d satisfies true;


//// [a.js]
"use strict";
//// [b.js]
"use strict";
//// [c.js]
import a, { c } from "./a.css" with { type: "css" };
import b, { d } from "a:b" with { type: "json", mode: "raw" };
a;
b;
c;
d;
