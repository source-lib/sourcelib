"use strict";
// ==========================================================================
// Purpose:
// Basic string functions for keyvalue tokenization
// ==========================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScalarValue = exports.isIntegerValue = exports.isFloatValue = exports.stripQuotes = exports.isQuoted = exports.isWhitespace = exports.regexInteger = exports.regexFloat = exports.regexScalar = void 0;
exports.regexScalar = /^((0?\.\d+)|([10]?\.\d+)|[01])$/;
exports.regexFloat = /^-?((\d+)|(\d*\.\d+))$/;
exports.regexInteger = /^-?\d+$/;
function isWhitespace(char) {
    return char === " " || char === "\t" || char === "\n" || char === "\r";
}
exports.isWhitespace = isWhitespace;
function isQuoted(text) {
    return (text.startsWith("\"") && text.endsWith("\"")) ||
        (text.startsWith("'") && text.endsWith("'"));
}
exports.isQuoted = isQuoted;
function stripQuotes(text) {
    if (isQuoted(text)) {
        return text.substring(1, text.length - 1);
    }
    else
        return text;
}
exports.stripQuotes = stripQuotes;
function isMatchingValue(str, regex) {
    const matches = str.match(regex);
    return matches != null;
}
function isFloatValue(n) {
    return isMatchingValue(n, exports.regexFloat);
}
exports.isFloatValue = isFloatValue;
function isIntegerValue(n) {
    return isMatchingValue(n, exports.regexInteger);
}
exports.isIntegerValue = isIntegerValue;
function isScalarValue(n) {
    return isMatchingValue(n, exports.regexScalar);
}
exports.isScalarValue = isScalarValue;
exports.default = {
    isWhitespace,
    isQuoted,
    stripQuotes,
    isMatchingValue,
    isFloatValue,
    isIntegerValue,
    isScalarValue
};
//# sourceMappingURL=string-util.js.map