export declare enum TokenType {
    Comment = 0,
    Key = 1,
    Value = 2,
    ObjectStart = 3,
    ObjectEnd = 4,
    PreprocessorKey = 5,
    Conditional = 6
}
export declare class Range {
    start: number;
    end: number;
    constructor(start: number, end: number);
}
export declare class Token {
    type: TokenType;
    range: Range;
    value: string;
    line: number;
    constructor(type: TokenType, range: Range, value: string, line: number);
}
export declare class TokenList extends Array<Token> {
    static create(tokens: Token[]): TokenList;
    getAllOnLine(line: number): TokenList;
    getAllOfType(type: TokenType): TokenList;
}
