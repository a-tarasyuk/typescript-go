//// [tests/cases/conformance/importAttributes/importAttributes15.ts] ////

//// [a.ts]
declare module "*" with { type: "css" } {
    const a: { kind: "a" };
    export default a;
}

declare module "*" with { type: "css" } {
    export const b: true;
}

declare module "*" with { type: "json" } {
    const c: { kind: "c" };
    export default c;
}

declare module "*" {
    const g: { kind: "g" };
    export default g;
}

declare module "a:*" with { type: "css" } {
    const d: { kind: "d" };
    export default d;
}

declare module "a:b" with { type: "css" } {
    const e: { kind: "e" };
    export default e;
}

declare module "a:d" with { type: "json" } {
    const f: { kind: "f" };
    export default f;
}

//// [b.ts]
import a, { b } from "b:c" with { type: "css" };
import c from "b:c" with { type: "json" };
import d from "a:c" with { type: "css" };
import e from "a:b" with { type: "css" };
import f from "a:d" with { type: "json" };
import g from "b:c";

a satisfies { kind: "a" };
b satisfies true;
c satisfies { kind: "c" };
d satisfies { kind: "d" };
e satisfies { kind: "e" };
f satisfies { kind: "f" };
g satisfies { kind: "g" };


//// [a.js]
"use strict";
//// [b.js]
import a, { b } from "b:c" with { type: "css" };
import c from "b:c" with { type: "json" };
import d from "a:c" with { type: "css" };
import e from "a:b" with { type: "css" };
import f from "a:d" with { type: "json" };
import g from "b:c";
a;
b;
c;
d;
e;
f;
g;
