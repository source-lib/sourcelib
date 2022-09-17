"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParentDocumentDirectory = exports.matrixRegExp = exports.getMatrixMatches = exports.ClrTagInfo = exports.populateColorTagMatches = exports.ColorMatchParenthesisType = exports.ColorMatchDescription = exports.getColorMatches = exports.isScalarValue = exports.isIntegerValue = exports.isFloatValue = exports.stripQuotes = exports.isQuoted = exports.isWhitespace = exports.ShaderParamHint = exports.ShaderParam = exports.formatLine = exports.formatAll = exports.TokenType = exports.TokenList = exports.Token = exports.Tokenizer = void 0;
const tokenizer_1 = require("./tokenizer");
Object.defineProperty(exports, "Tokenizer", { enumerable: true, get: function () { return tokenizer_1.Tokenizer; } });
const token_1 = require("./token");
Object.defineProperty(exports, "Token", { enumerable: true, get: function () { return token_1.Token; } });
Object.defineProperty(exports, "TokenList", { enumerable: true, get: function () { return token_1.TokenList; } });
Object.defineProperty(exports, "TokenType", { enumerable: true, get: function () { return token_1.TokenType; } });
const formatter_1 = require("./formatter");
Object.defineProperty(exports, "formatAll", { enumerable: true, get: function () { return formatter_1.formatAll; } });
Object.defineProperty(exports, "formatLine", { enumerable: true, get: function () { return formatter_1.formatLine; } });
const shader_param_1 = require("./shader-param");
Object.defineProperty(exports, "ShaderParam", { enumerable: true, get: function () { return shader_param_1.ShaderParam; } });
Object.defineProperty(exports, "ShaderParamHint", { enumerable: true, get: function () { return shader_param_1.ShaderParamHint; } });
const string_util_1 = require("./string-util");
Object.defineProperty(exports, "isWhitespace", { enumerable: true, get: function () { return string_util_1.isWhitespace; } });
Object.defineProperty(exports, "isQuoted", { enumerable: true, get: function () { return string_util_1.isQuoted; } });
Object.defineProperty(exports, "stripQuotes", { enumerable: true, get: function () { return string_util_1.stripQuotes; } });
Object.defineProperty(exports, "isFloatValue", { enumerable: true, get: function () { return string_util_1.isFloatValue; } });
Object.defineProperty(exports, "isIntegerValue", { enumerable: true, get: function () { return string_util_1.isIntegerValue; } });
Object.defineProperty(exports, "isScalarValue", { enumerable: true, get: function () { return string_util_1.isScalarValue; } });
const color_1 = require("./color");
Object.defineProperty(exports, "getColorMatches", { enumerable: true, get: function () { return color_1.getColorMatches; } });
Object.defineProperty(exports, "ColorMatchDescription", { enumerable: true, get: function () { return color_1.ColorMatchDescription; } });
Object.defineProperty(exports, "ColorMatchParenthesisType", { enumerable: true, get: function () { return color_1.ColorMatchParenthesisType; } });
const caption_tag_matches_1 = require("./caption-tag-matches");
Object.defineProperty(exports, "populateColorTagMatches", { enumerable: true, get: function () { return caption_tag_matches_1.populateColorTagMatches; } });
Object.defineProperty(exports, "ClrTagInfo", { enumerable: true, get: function () { return caption_tag_matches_1.ClrTagInfo; } });
const matrix_1 = require("./matrix");
Object.defineProperty(exports, "getMatrixMatches", { enumerable: true, get: function () { return matrix_1.getMatrixMatches; } });
Object.defineProperty(exports, "matrixRegExp", { enumerable: true, get: function () { return matrix_1.matrixRegExp; } });
const source_fs_1 = require("./source-fs");
Object.defineProperty(exports, "getParentDocumentDirectory", { enumerable: true, get: function () { return source_fs_1.getParentDocumentDirectory; } });
//# sourceMappingURL=main.js.map