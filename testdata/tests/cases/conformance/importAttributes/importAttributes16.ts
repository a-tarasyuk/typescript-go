// @module: esnext
// @target: esnext

// @filename: a.ts
declare module "*" with { type: "css" } {
    const a: { kind: "a" };
    export default a;
}

declare module "*" {
    const b: { kind: "b" };
    export default b;
}

declare module "a:*" with { type: "json" } {
    const c: { kind: "c" };
    export default c;
}

declare module "b:c" with { type: "json" } {
    const d: { kind: "d" };
    export default d;
}

declare module "c:d" with { type: "css" } {
    const e: { kind: "e" };
    export default e;
}

declare module "d:e" {
    const f: { kind: "f" };
    export default f;
}

// @filename: b.ts
import a from "a:b" with { type: "css" };
import b from "b:c" with { type: "css" };
import c from "c:d";
import d from "d:e" with { type: "css" };

a satisfies { kind: "a" };
b satisfies { kind: "a" };
c satisfies { kind: "b" };
d satisfies { kind: "a" };
