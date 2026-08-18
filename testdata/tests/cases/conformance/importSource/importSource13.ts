// @module: esnext
// @target: esnext
// @lib: esnext,dom

// @filename: a.d.ts
declare module "*.wasm";

// @filename: b.ts
import source a from "./a.wasm";
const b: WebAssembly.Module = a;
const c: Promise<WebAssembly.Module> = import.source("./a.wasm");
