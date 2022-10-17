import { isQuoted, stripQuotes } from "./string-util";

export enum TokenType {
    Comment,
    Key,
    Value,
    ObjectStart,
    ObjectEnd,
    PreprocessorKey,
    Conditional
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

export class ParseError {

    public type: ParseErrorType;
    public position: Position;

    constructor(type: ParseErrorType, position: Position) {
        this.type = type;
        this.position = position;
    }

}

export enum ParseErrorType {
    MissingValue,
    MissingKey,
    MissingClosingBrace,
    UnexpectedClosingBrace,
    MissingRootObject,
}

export class Range {
    public start: number;
    public end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    public getLength(): number {
        return this.end - this.start;
    }

    public isIntersecting(other: Range): boolean {
        return this.start <= other.end && this.end >= other.start;
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

export class Conditional {
    public conditionalString: string;
    public position: Position;

    constructor(conditionalString: string, position: Position) {
        this.conditionalString = conditionalString;
        this.position = position;
    }
}

export class Item {

    private parent: Item | null;
    private key: PositionedLiteral;
    private children: Item[] | null;
    private values: PositionedLiteral[] | null;
    private condition: Conditional | null;

    private constructor(key: PositionedLiteral, parent: Item | null, condition: Conditional | null) {
        this.key = key;
        this.children = null;
        this.values = null;
        this.parent = parent;
        this.condition = condition;
    }

    public static createLeaf(parent: Item | null, key: PositionedLiteral, value: PositionedLiteral[], condition: Conditional | null = null): Item {
        const item = new Item(key, parent, condition);
        item.values = value;
        return item;
    }

    public static createContainer(parent: Item | null, key: PositionedLiteral, children: Item[], condition: Conditional | null = null): Item {
        const item = new Item(key, parent, condition);
        item.children = children;
        return item;
    }

    public isLeaf(): boolean {
        return this.children == null;
    }

    public getValues(): PositionedLiteral[] | null {
        return this.values;
    }

    public getChildren(): Item[] | null {
        return this.children;
    }

    public getKey(): PositionedLiteral {
        return this.key;
    }

    public addChild(child: Item): void {
        if( this.children == null ) {
            this.children = [];
        }
        this.children.push(child);
    }

    public getParent(): Item | null {
        return this.parent;
    }

    public isRoot(): boolean {
        return this.parent == null;
    }

    public getCondition(): Conditional | null {
        return this.condition;
    }

    public hasCondition(): boolean {
        return this.condition != null;
    }
}

export class Document {

    private rootItems: Item[];
    private errors: ParseError[];

    public constructor(rootItems: Item[], errors: ParseError[]) {
        this.rootItems = rootItems;
        this.errors = errors;
    }

    public getRootItems(): Item[] {
        return this.rootItems;
    }

    public getErrors(): ParseError[] {
        return this.errors;
    }

}