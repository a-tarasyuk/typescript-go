// @module: esnext
// @target: esnext

// @filename: a.ts
declare module "*.css" with { type: "css" } {
    const a: never;
    export default a;
}

declare module "*.txt" {
    const b: never;
    export default b;
}

declare module "*.wasm" with { type: "module", version: "1" } {
    const c: never;
    export default c;
}

declare module "a:b" with { type: 1 } {}
declare module "a:c" with { type: `css` } {}
declare module "a:d" assert { type: "css" } {}

// @filename: b.ts
import a from "a.css" with { type: "style" };
import b from "b.css";
import c from "a.txt" with { type: "text" };
import d from "a.wasm" with { type: "module" };
import e from "b.wasm" with { type: "module", version: "1", extra: "value" };
import f from "c.css" assert { type: "css" };

a;
b;
c;
d;
e;
f;
