// @module: node16
// @moduleDetection: legacy
// @target: es2022
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: a.ts
declare module "a:b" with { "resolution-mode": "import" } {
    export interface A {
        kind: "a";
    }
}

// @filename: b.js
/** @import { A } from "a:b" with { "resolution-mode": "import" } */

/** @type {A} */
const a = { kind: "a" };

// @filename: c.ts
type B = import("a:b", { with: { "resolution-mode": "import" } }).A;
declare const b: B;
b satisfies { kind: "a" };
