//// [tests/cases/conformance/importSource/importSource20.ts] ////

//// [package.json]
{"name":"a","exports":{"types":"./index.d.ts","default":"./a.wasm"}}

//// [index.d.ts]
declare const a: string;
export default a;

//// [a.wasm]

//// [b.ts]
import source a from "a";
const b: WebAssembly.Module = a;

const c = import.source("a");
const d: Promise<WebAssembly.Module> = c;


//// [b.js]
import source a from "a";
const b = a;
const c = import.source("a");
const d = c;
