
export enum TokenType {
    Comment,
    Key,
    Value,
    ObjectStart,
    ObjectEnd,
    PreprocessorKey,
    Conditional
}

export class Range {
	public start: number;
	public end: number;

	constructor(start: number, end: number) {
		this.start = start;
		this.end = end;
	}
}

export class Token {
	type: TokenType;
	range: Range;
	value: string;
	line: number;

	constructor(type: TokenType, range: Range, value: string, line: number) {
		this.type = type;
		this.range = range;
		this.value = value;
		this.line = line;
	}
}

export class TokenList extends Array<Token> {

	public static create(tokens: Token[]): TokenList {
		return new TokenList(...tokens);
	}

	public getAllOnLine(line: number): TokenList {
		return TokenList.create(this.filter(t => t.line == line));
	}

	public getAllOfType(type: TokenType): TokenList {
		return TokenList.create(this.filter(t => t.type == type));
	}

}
