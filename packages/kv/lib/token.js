"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenList = exports.Token = exports.Range = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Comment"] = 0] = "Comment";
    TokenType[TokenType["Key"] = 1] = "Key";
    TokenType[TokenType["Value"] = 2] = "Value";
    TokenType[TokenType["ObjectStart"] = 3] = "ObjectStart";
    TokenType[TokenType["ObjectEnd"] = 4] = "ObjectEnd";
    TokenType[TokenType["PreprocessorKey"] = 5] = "PreprocessorKey";
    TokenType[TokenType["Conditional"] = 6] = "Conditional";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
exports.Range = Range;
class Token {
    constructor(type, range, value, line) {
        this.type = type;
        this.range = range;
        this.value = value;
        this.line = line;
    }
}
exports.Token = Token;
class TokenList extends Array {
    static create(tokens) {
        return new TokenList(...tokens);
    }
    getAllOnLine(line) {
        return TokenList.create(this.filter(t => t.line == line));
    }
    getAllOfType(type) {
        return TokenList.create(this.filter(t => t.type == type));
    }
}
exports.TokenList = TokenList;
//# sourceMappingURL=token.js.map