import { test, expect } from "vitest";
import { KvStringUtil } from "../../src/kv/KvStringUtil";

test("Is Quoted", () => {
    expect(KvStringUtil.isQuoted("")).toBeFalsy();
    expect(KvStringUtil.isQuoted("hi")).toBeFalsy();
    expect(KvStringUtil.isQuoted("'hi'")).toBeTruthy();
    expect(KvStringUtil.isQuoted('"hi"')).toBeTruthy();

    expect(KvStringUtil.isQuoted("'hi\"")).toBeFalsy();

    expect(KvStringUtil.isQuoted("'hi")).toBeFalsy();
});

test("Strip Quotes", () => {
    expect(KvStringUtil.stripQuotes("")).toBe("");
    expect(KvStringUtil.stripQuotes("'")).toBe("'");
    expect(KvStringUtil.stripQuotes("''")).toBe("");
    expect(KvStringUtil.stripQuotes("hi")).toBe("hi");
    expect(KvStringUtil.stripQuotes('"hi"')).toBe("hi");
    expect(KvStringUtil.stripQuotes('"hi')).toBe('"hi');
});

test("IsWhitespace", () => {
    expect(KvStringUtil.isWhitespace("")).toBeFalsy();
    expect(KvStringUtil.isWhitespace("a")).toBeFalsy();
    expect(KvStringUtil.isWhitespace(" ")).toBeTruthy();
    expect(KvStringUtil.isWhitespace("\t")).toBeTruthy();
    expect(KvStringUtil.isWhitespace("\n")).toBeTruthy();
    expect(KvStringUtil.isWhitespace("\r")).toBeTruthy();
});

test("Is Float", () => {
    expect(KvStringUtil.isFloatValue("")).toBeFalsy();
    expect(KvStringUtil.isFloatValue("aaa")).toBeFalsy();
    expect(KvStringUtil.isFloatValue("hi3.04fgdf")).toBeFalsy();
    expect(KvStringUtil.isFloatValue("0")).toBeTruthy();
    expect(KvStringUtil.isFloatValue("0.0")).toBeTruthy();
    expect(KvStringUtil.isFloatValue("1")).toBeTruthy();
    expect(KvStringUtil.isFloatValue("1.0")).toBeTruthy();
    expect(KvStringUtil.isFloatValue("3.1415")).toBeTruthy();
    expect(KvStringUtil.isFloatValue(".1")).toBeTruthy();
    expect(KvStringUtil.isFloatValue("0.1")).toBeTruthy();
    expect(KvStringUtil.isFloatValue("277.00")).toBeTruthy();
    expect(KvStringUtil.isFloatValue("-277.00")).toBeTruthy();
});

test("Is Scalar", () => {
    expect(KvStringUtil.isScalarValue("")).toBeFalsy();
    expect(KvStringUtil.isScalarValue("aaa")).toBeFalsy();
    expect(KvStringUtil.isScalarValue("hi3.04fgdf")).toBeFalsy();
    expect(KvStringUtil.isScalarValue("0")).toBeTruthy();
    expect(KvStringUtil.isScalarValue("0.0")).toBeTruthy();
    expect(KvStringUtil.isScalarValue("1")).toBeTruthy();
    expect(KvStringUtil.isScalarValue("1.0")).toBeTruthy();
    expect(KvStringUtil.isScalarValue("3.1415")).toBeFalsy();
    expect(KvStringUtil.isScalarValue(".1")).toBeTruthy();
    expect(KvStringUtil.isScalarValue("0.1")).toBeTruthy();
    expect(KvStringUtil.isScalarValue("277.00")).toBeFalsy();
});

test("Is Integer", () => {
    expect(KvStringUtil.isIntegerValue("")).toBeFalsy();
    expect(KvStringUtil.isIntegerValue("aaa")).toBeFalsy();
    expect(KvStringUtil.isIntegerValue("hi3.04fgdf")).toBeFalsy();
    expect(KvStringUtil.isIntegerValue("0")).toBeTruthy();
    expect(KvStringUtil.isIntegerValue("0.0")).toBeFalsy();
    expect(KvStringUtil.isIntegerValue("1")).toBeTruthy();
    expect(KvStringUtil.isIntegerValue("1.0")).toBeFalsy();
    expect(KvStringUtil.isIntegerValue("3.1415")).toBeFalsy();
    expect(KvStringUtil.isIntegerValue(".1")).toBeFalsy();
    expect(KvStringUtil.isIntegerValue("0.1")).toBeFalsy();
    expect(KvStringUtil.isIntegerValue("277")).toBeTruthy();
    expect(KvStringUtil.isIntegerValue("277.00")).toBeFalsy();
    expect(KvStringUtil.isIntegerValue("-277")).toBeTruthy();
});
