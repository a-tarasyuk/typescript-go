//// [tests/cases/conformance/importAttributes/importAttributes14.ts] ////

//// [a.ts]
declare module "*.css" with { type: "css" } {
    const a: { kind: "a" };
    export default a;
}

declare module "*.txt" {
    const b: { kind: "b" };
    export default b;
}

declare module "*.wasm" with { type: "module", version: "1" } {
    const c: { kind: "c" };
    export default c;
}

//// [b.ts]
async function f() {
    const a = await import("a.css", { with: { type: "css" } });
    const b = await import("a.txt");
    const c = await import("a.wasm", { with: { version: "1", type: "module" } });
    const d = await import("b.css", { with: { type: "style" } });
    const e = await import("b.txt", { with: { type: "text" } });
    const f = await import("b.wasm", { with: { type: "module" } });
    const g = await import("c.wasm", { with: { type: "module", version: "1", extra: "value" } });

    a.default satisfies { kind: "a" };
    b.default satisfies { kind: "b" };
    c.default satisfies { kind: "c" };
    d.default;
    e.default;
    f.default;
    g.default;
}


//// [a.js]
"use strict";
//// [b.js]
"use strict";
async function f() {
    const a = await import("a.css", { with: { type: "css" } });
    const b = await import("a.txt");
    const c = await import("a.wasm", { with: { version: "1", type: "module" } });
    const d = await import("b.css", { with: { type: "style" } });
    const e = await import("b.txt", { with: { type: "text" } });
    const f = await import("b.wasm", { with: { type: "module" } });
    const g = await import("c.wasm", { with: { type: "module", version: "1", extra: "value" } });
    a.default;
    b.default;
    c.default;
    d.default;
    e.default;
    f.default;
    g.default;
}
