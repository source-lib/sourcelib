"use strict";
// ==========================================================================
// Purpose:
// Tests for string util functions
// ==========================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const string_util_1 = require("./string-util");
test("Is Quoted", () => {
    expect((0, string_util_1.isQuoted)("")).toBeFalsy();
    expect((0, string_util_1.isQuoted)("hi")).toBeFalsy();
    expect((0, string_util_1.isQuoted)("'hi'")).toBeTruthy();
    expect((0, string_util_1.isQuoted)("\"hi\"")).toBeTruthy();
    expect((0, string_util_1.isQuoted)("'hi\"")).toBeFalsy();
    expect((0, string_util_1.isQuoted)("'hi")).toBeFalsy();
});
test("Strip Quotes", () => {
    expect((0, string_util_1.stripQuotes)("")).toBe("");
    expect((0, string_util_1.stripQuotes)("'")).toBe("'");
    expect((0, string_util_1.stripQuotes)("''")).toBe("");
    expect((0, string_util_1.stripQuotes)("hi")).toBe("hi");
    expect((0, string_util_1.stripQuotes)("\"hi\"")).toBe("hi");
    expect((0, string_util_1.stripQuotes)("\"hi")).toBe("\"hi");
});
test("IsWhitespace", () => {
    expect((0, string_util_1.isWhitespace)("")).toBeFalsy();
    expect((0, string_util_1.isWhitespace)("a")).toBeFalsy();
    expect((0, string_util_1.isWhitespace)(" ")).toBeTruthy();
    expect((0, string_util_1.isWhitespace)("\t")).toBeTruthy();
    expect((0, string_util_1.isWhitespace)("\n")).toBeTruthy();
    expect((0, string_util_1.isWhitespace)("\r")).toBeTruthy();
});
test("Is Float", () => {
    expect((0, string_util_1.isFloatValue)("")).toBeFalsy();
    expect((0, string_util_1.isFloatValue)("aaa")).toBeFalsy();
    expect((0, string_util_1.isFloatValue)("hi3.04fgdf")).toBeFalsy();
    expect((0, string_util_1.isFloatValue)("0")).toBeTruthy();
    expect((0, string_util_1.isFloatValue)("0.0")).toBeTruthy();
    expect((0, string_util_1.isFloatValue)("1")).toBeTruthy();
    expect((0, string_util_1.isFloatValue)("1.0")).toBeTruthy();
    expect((0, string_util_1.isFloatValue)("3.1415")).toBeTruthy();
    expect((0, string_util_1.isFloatValue)(".1")).toBeTruthy();
    expect((0, string_util_1.isFloatValue)("0.1")).toBeTruthy();
    expect((0, string_util_1.isFloatValue)("277.00")).toBeTruthy();
    expect((0, string_util_1.isFloatValue)("-277.00")).toBeTruthy();
});
test("Is Scalar", () => {
    expect((0, string_util_1.isScalarValue)("")).toBeFalsy();
    expect((0, string_util_1.isScalarValue)("aaa")).toBeFalsy();
    expect((0, string_util_1.isScalarValue)("hi3.04fgdf")).toBeFalsy();
    expect((0, string_util_1.isScalarValue)("0")).toBeTruthy();
    expect((0, string_util_1.isScalarValue)("0.0")).toBeTruthy();
    expect((0, string_util_1.isScalarValue)("1")).toBeTruthy();
    expect((0, string_util_1.isScalarValue)("1.0")).toBeTruthy();
    expect((0, string_util_1.isScalarValue)("3.1415")).toBeFalsy();
    expect((0, string_util_1.isScalarValue)(".1")).toBeTruthy();
    expect((0, string_util_1.isScalarValue)("0.1")).toBeTruthy();
    expect((0, string_util_1.isScalarValue)("277.00")).toBeFalsy();
});
test("Is Integer", () => {
    expect((0, string_util_1.isIntegerValue)("")).toBeFalsy();
    expect((0, string_util_1.isIntegerValue)("aaa")).toBeFalsy();
    expect((0, string_util_1.isIntegerValue)("hi3.04fgdf")).toBeFalsy();
    expect((0, string_util_1.isIntegerValue)("0")).toBeTruthy();
    expect((0, string_util_1.isIntegerValue)("0.0")).toBeFalsy();
    expect((0, string_util_1.isIntegerValue)("1")).toBeTruthy();
    expect((0, string_util_1.isIntegerValue)("1.0")).toBeFalsy();
    expect((0, string_util_1.isIntegerValue)("3.1415")).toBeFalsy();
    expect((0, string_util_1.isIntegerValue)(".1")).toBeFalsy();
    expect((0, string_util_1.isIntegerValue)("0.1")).toBeFalsy();
    expect((0, string_util_1.isIntegerValue)("277")).toBeTruthy();
    expect((0, string_util_1.isIntegerValue)("277.00")).toBeFalsy();
    expect((0, string_util_1.isIntegerValue)("-277")).toBeTruthy();
});
//# sourceMappingURL=string-util.test.js.map