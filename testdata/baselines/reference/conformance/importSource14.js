//// [tests/cases/conformance/importSource/importSource14.ts] ////

//// [a.d.wasm.ts]
export function add(a: number, b: number): number;

//// [b.js]
import source a from "./a.wasm";
const b = import.source("./a.wasm");
/** @type {WebAssembly.Module} */
const c = a;
/** @type {Promise<WebAssembly.Module>} */
const d = b;


//// [b.js]
import source a from "./a.wasm";
const b = import.source("./a.wasm");
/** @type {WebAssembly.Module} */
const c = a;
/** @type {Promise<WebAssembly.Module>} */
const d = b;
