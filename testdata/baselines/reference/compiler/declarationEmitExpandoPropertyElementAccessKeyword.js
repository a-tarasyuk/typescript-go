//// [tests/cases/compiler/declarationEmitExpandoPropertyElementAccessKeyword.ts] ////

//// [a.js]
var f = {};
f["default"] = "default";




//// [a.d.ts]
declare var f: {
    default: string;
};
declare namespace f {
    var _a: string;
    export { _a as default };
}


//// [DtsFileErrors]


a.d.ts(1,13): error TS2300: Duplicate identifier 'f'.
a.d.ts(4,19): error TS2300: Duplicate identifier 'f'.


==== a.d.ts (2 errors) ====
    declare var f: {
                ~
!!! error TS2300: Duplicate identifier 'f'.
        default: string;
    };
    declare namespace f {
                      ~
!!! error TS2300: Duplicate identifier 'f'.
        var _a: string;
        export { _a as default };
    }
    