// @module: esnext
// @target: esnext
// @declaration: true

// @filename: a.ts
declare module "*.css" with { type: "css" } {
    const a: { kind: "a" };
    export default a;
}

declare module "*.json" with { type: "json" } {
    const b: { kind: "b" };
    export default b;
}

declare module "a:b" with { type: "json", mode: "raw" } {
    const c: { kind: "c" };
    export const d: true;
    export default c;
}

declare module "*.txt" {
    const e: { kind: "e" };
    export default e;
}

// @filename: b.ts
import a from "./a.css" with { type: "css" };
import b from "./b.json" with { type: "json" };
import c, { d } from "a:b" with { mode: "raw", type: "json" };
import e from "./c.txt";

a satisfies { kind: "a" };
b satisfies { kind: "b" };
c satisfies { kind: "c" };
d satisfies true;
e satisfies { kind: "e" };
