// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @lib: esnext,dom
// @strict: true
// @noImplicitReferences: true

// @filename: node_modules/a/package.json
{"name":"a","exports":{"types":"./index.d.ts","default":"./a.wasm"}}

// @filename: node_modules/a/index.d.ts
declare const a: string;
export default a;

// @filename: node_modules/a/a.wasm

// @filename: b.ts
import source a from "a";
const b: WebAssembly.Module = a;

const c = import.source("a");
const d: Promise<WebAssembly.Module> = c;
