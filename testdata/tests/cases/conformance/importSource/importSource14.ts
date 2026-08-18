// @module: esnext
// @target: esnext
// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @lib: esnext,dom

// @filename: a.d.wasm.ts
export function add(a: number, b: number): number;

// @filename: b.js
import source a from "./a.wasm";
const b = import.source("./a.wasm");
/** @type {WebAssembly.Module} */
const c = a;
/** @type {Promise<WebAssembly.Module>} */
const d = b;
