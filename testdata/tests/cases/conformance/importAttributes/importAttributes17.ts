// @module: esnext
// @target: esnext

// @filename: a.ts
declare module "*.css" with { type: "css" } {
    const a: { kind: "a" };
    export default a;
}

// @filename: b.ts
export { default as a } from "./a.css" with { type: "css" };
