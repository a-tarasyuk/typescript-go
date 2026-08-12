// @module: esnext
// @target: esnext
// @declaration: true

// @filename: a.ts
declare module "a:b" with { type: "css" } {
    export const a: "a";
}

declare module "a:b" with { type: "json" } {
    export const b: "b";
}

declare module "a:b" {
    export const d: "d";
}

declare module "a:c" with {} {
    export const g: "g";
}

declare module "a:c" {
    export const h: "h";
}

// @filename: b.ts
export {};

declare module "a:b" with { type: "css" } {
    export const c: "c";
}

declare module "a:b" with { type: "css" } {
    export const e: "e";
}

declare module "a:b" with { type: "json" } {
    export const f: "f";
}

// @filename: c.ts
import * as a from "a:b" with { type: "css" };
import * as b from "a:b" with { type: "json" };
import * as c from "a:b";
import * as d from "a:c" with {};
import * as e from "a:c";

a.a satisfies "a";
a.c satisfies "c";
a.e satisfies "e";
b.b satisfies "b";
b.f satisfies "f";
c.d satisfies "d";
d.g satisfies "g";
e.h satisfies "h";

// @ts-expect-error
a.b;

// @ts-expect-error
b.a;

// @ts-expect-error
b.c;

// @ts-expect-error
a.f;

// @ts-expect-error
b.e;

// @ts-expect-error
c.a;

// @ts-expect-error
c.b;

// @ts-expect-error
c.c;

// @ts-expect-error
d.h;

// @ts-expect-error
e.g;
