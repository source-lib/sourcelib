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

    public toLiteral(): Literal {
        return new Literal(this.getPosition(), this.value);
    }
    
    public getPosition(): Position {
        return new Position(this.line, this.range);
    }

    public toConditional(): Conditional {
        return new Conditional(this.value, this.getPosition());
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
    UnexpectedOpeningBrace,
    UnexpectedClosingBrace,
    MissingRootObject,
}

export class Range {
    private start: number;
    private end: number;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    public copy(): Range {
        return new Range(this.start, this.end);
    }

    public getStart(): number {
        return this.start;
    }

    public getEnd(): number {
        return this.end;
    }

    public moveBy(delta: number): void {
        this.start += delta;
        this.end += delta;
    }

    public moveTo(start: number, end: number): void {
        this.start = start;
        this.end = end;
    }

    public moveStartTo(start: number): void {
        this.start = start;
    }

    public moveEndTo(end: number): void {
        this.end = end;
    }

    public moveStartBy(delta: number): void {
        this.start += delta;
    }

    public moveEndBy(delta: number): void {
        this.end += delta;
    }

    public isValid(): boolean {
        return this.start < this.end;
    }

    public getLength(): number {
        return this.end - this.start;
    }

    public isIntersecting(other: Range): boolean {
        return this.start <= other.end && this.end >= other.start;
    }
}

export class Position {
    private line: number;
    private range: Range;

    constructor(line: number, range: Range) {
        this.line = line;
        this.range = range;
    }

    public getLine(): number {
        return this.line;
    }

    public getRange(): Range {
        return this.range;
    }
}

export class Literal {
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
    
    public asUnquoted(): Literal {
        if( !this.isQuoted() ) return this;
        
        const newContent = stripQuotes(this.getContent());
        const newRange = this.getPosition().getRange().copy();
        newRange.moveStartBy(1);
        newRange.moveEndBy(-1);
        const newPosition = new Position(this.getPosition()!.getLine(), newRange);
        return new Literal(newPosition, newContent);
    }

    public isValid(): boolean {
        return this.getContent().length === this.getPosition().getRange().getLength();
    }
    
}

export class Conditional {
    private conditionalString: string;
    private position: Position;

    constructor(conditionalString: string, position: Position) {
        this.conditionalString = conditionalString;
        this.position = position;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getConditionalString(): string {
        return this.conditionalString;
    }
}

export class Item {

    private parent: Item | null;
    private key: Literal;
    private children: Item[] | null;
    private values: Literal[] | null;
    private condition: Conditional | null;
    private openingBrace: Literal;
    private closingBrace: Literal;

    private constructor(key: Literal, parent: Item | null, condition: Conditional | null) {
        this.key = key;
        this.children = null;
        this.values = null;
        this.parent = parent;
        this.condition = condition;
    }

    public static createLeaf(parent: Item | null, key: Literal, value: Literal[], condition: Conditional | null = null): Item {
        const item = new Item(key, parent, condition);
        item.values = value;
        return item;
    }

    public static createContainer(parent: Item | null, key: Literal, children: Item[], condition: Conditional | null = null): Item {
        const item = new Item(key, parent, condition);
        item.children = children;
        return item;
    }

    public isLeaf(): boolean {
        return this.children == null && this.values != null;
    }

    public getValues(): Literal[] | null {
        return this.values;
    }

    public getChildren(): Item[] | null {
        return this.children;
    }

    public getKey(): Literal {
        return this.key;
    }

    public addChild(child: Item): void {
        if( this.children == null ) {
            this.children = [];
        }
        this.children.push(child);
    }

    public replaceChildren(children: Item[]): void {
        this.children = children;
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

    public startPopulatingContainer(openingBrace: Literal): void {
        this.openingBrace = openingBrace;
    }

    public endPopulatingContainer(closingBrace: Literal): void {
        this.closingBrace = closingBrace;
    }

    public getOpeningBrace(): Literal {
        return this.openingBrace;
    }

    public getClosingBrace(): Literal {
        return this.closingBrace;
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

    public hasErrors(): boolean {
        return this.errors.length > 0;
    }

    public toStringPreservePositions(): string {
        
        return "";
    }

}