// @module: esnext
// @target: esnext
// @lib: esnext,dom
// @noImplicitReferences: true
// @allowArbitraryExtensions: true

// @filename: a.d.wasm.ts
export {};

// @filename: b.ts
import source a from "./a.wasm";
export { a };

// @filename: c.ts
import source a from "././a.wasm";
export { a };

// @filename: d.ts
export * from "./b.js";
export * from "./c.js";

// @filename: e.wasm

// @filename: f.ts
import source e from "./e.wasm";
export { e };

// @filename: g.ts
import source e from "././e.wasm";
export { e };

// @filename: h.ts
export * from "./f.js";
export * from "./g.js";

// @filename: i.d.txt.ts
export {};

// @filename: j.ts
import source i from "./i.txt";
export { i };

// @filename: k.ts
import source i from "././i.txt";
export { i };

// @filename: l.ts
export * from "./j.js";
export * from "./k.js";

// @filename: m.ts
import { a } from "./d.js";
import { e } from "./h.js";
import { i } from "./l.js";
const b: WebAssembly.Module = a;
const c: WebAssembly.Module = e;
const d: any = i;
