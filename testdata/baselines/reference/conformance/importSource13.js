//// [tests/cases/conformance/importSource/importSource13.ts] ////

//// [a.d.ts]
declare module "*.wasm";

//// [b.ts]
import source a from "./a.wasm";
const b: WebAssembly.Module = a;
const c: Promise<WebAssembly.Module> = import.source("./a.wasm");


//// [b.js]
import source a from "./a.wasm";
const b = a;
const c = import.source("./a.wasm");
