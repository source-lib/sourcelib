import { isQuoted, stripQuotes } from "string-util";

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

export class Position {
    public line: number;
    public range: Range;

    constructor(line: number, range: Range) {
        this.line = line;
        this.range = range;
    }
}

export class PositionedLiteral {
    private position: Position;
    private content: string;

    constructor(position: Position, content: string) {
        this.position = position;
        this.content = content;
    }

    public isQuoted(): boolean {
        return isQuoted(this.content);
    }

    public getPosition(): Position {
        return this.position;
    }
    
    public getUnquotedContent(): string {
        if( !this.isQuoted() ) 
            return this.content;
        
        return stripQuotes(this.content);
    }
    
    public getContent(): string {
        return this.content;
    }

    public asUnquoted(): PositionedLiteral {
        if( !this.isQuoted() ) return this;

        const newRange = new Range(this.position.range.start + 1, this.position.range.end - 1);
        const newPosition = new Position(this.position.line, newRange);
        const newContent = stripQuotes(this.content);
        return new PositionedLiteral(newPosition, newContent);
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
