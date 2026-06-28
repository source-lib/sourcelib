import { KvTokenizer } from "./KvTokenizer.js";
import { KvStringUtil } from "./KvStringUtil.js";

export enum TokenType {
    Comment,
    Key,
    Value,
    ObjectStart,
    ObjectEnd,
    PreprocessorKey,
    Conditional,
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
        return new Conditional(this.getPosition(), this.value);
    }
}

export class TokenList extends Array<Token> {
    public static create(tokens: Token[]): TokenList {
        return new TokenList(...tokens);
    }

    public getAllOnLine(line: number): TokenList {
        return TokenList.create(this.filter((t) => t.line == line));
    }

    public getAllOfType(type: TokenType): TokenList {
        return TokenList.create(this.filter((t) => t.type == type));
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
        if (start < 0) {
            throw new RangeError("Start must not be less than zero");
        }
        if (end < 0) {
            throw new RangeError("End must not be less than zero");
        }
        if (end < start) {
            throw new RangeError("End must not be less than start");
        }
        if (!Number.isInteger(start)) {
            throw new RangeError("Start must not be a float");
        }
        if (!Number.isInteger(end)) {
            throw new RangeError("End must not be a float");
        }
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
        if (!Number.isInteger(delta)) {
            throw new RangeError("Delta must not be a float");
        }
        const destStart = this.start + delta;
        const destEnd = this.end + delta;

        if (destStart < 0 || destEnd < 0) {
            throw new RangeError("Resulting range is less than 0");
        }
        this.start = destStart;
        this.end = destEnd;
    }

    public moveTo(start: number): void {
        const prevLength = this.getLength();
        this.start = start;
        this.end = start + prevLength;
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
        if (line < 0) {
            throw new RangeError("Line cannot be less than zero");
        }
        this.line = line;
        this.range = range;
    }

    public getLine(): number {
        return this.line;
    }

    public getRange(): Range {
        return this.range;
    }

    public copy(): Position {
        return new Position(this.line, this.range);
    }

    /**
     *
     * @param delta Where to move the line to. Must be an unsigned int
     * @returns Returns 'this', mutated
     */
    public moveToLine(line: number): Position {
        if (!Number.isInteger(line)) {
            throw new RangeError("Line must not be float");
        }
        if (line < 0) {
            throw new RangeError("Line cannot be less than zero");
        }
        this.line = line;
        return this;
    }

    /**
     *
     * @param delta Amount of lines to move forward (down). Must be an int. Clamps at 0
     * @returns Returns 'this', mutated
     */
    public moveLineBy(delta: number): Position {
        if (!Number.isInteger(delta)) {
            throw new RangeError("Delta must not be float");
        }
        const dest = this.line - delta;
        if (dest < 0) {
            throw new RangeError("The resulting line number cannot be less than zero.");
        }
        return this;
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
        return KvStringUtil.isQuoted(this.content);
    }

    public getPosition(): Position {
        return this.position;
    }

    public getUnquotedContent(): string {
        if (!this.isQuoted()) return this.content;

        return KvStringUtil.stripQuotes(this.content);
    }

    public getContent(): string {
        return this.content;
    }

    public asUnquoted(): Literal {
        if (!this.isQuoted()) return this;

        const newContent = KvStringUtil.stripQuotes(this.getContent());
        const newRange = this.getPosition().getRange().copy();
        newRange.moveStartBy(1);
        newRange.moveEndBy(-1);
        const newPosition = new Position(this.getPosition()!.getLine(), newRange);
        return new Literal(newPosition, newContent);
    }

    public isValid(): boolean {
        return this.getContent().length === this.getPosition().getRange().getLength();
    }

    public copy(): Literal {
        return new Literal(this.position, this.content);
    }
}

export class Conditional extends Literal {}

export class Item {
    private parent: Item | null;
    private key: Literal;
    private children: Item[] | null;
    private values: Literal[] | null;
    private condition: Conditional | null;
    private openingBrace: Literal | null;
    private closingBrace: Literal | null;

    private constructor(key: Literal, parent: Item | null, condition: Conditional | null) {
        this.key = key;
        this.children = null;
        this.values = null;
        this.parent = parent;
        this.condition = condition;
        this.openingBrace = null;
        this.closingBrace = null;
    }

    public static createLeaf(
        parent: Item | null,
        key: Literal,
        value: Literal[],
        condition: Conditional | null = null,
    ): Item {
        const item = new Item(key, parent, condition);
        item.values = value;
        return item;
    }

    public static createContainer(
        parent: Item | null,
        key: Literal,
        children: Item[],
        condition: Conditional | null = null,
    ): Item {
        const item = new Item(key, parent, condition);
        item.children = children;
        return item;
    }

    public copy(): Item {
        const item = new Item(this.key, this.parent, this.condition);
        item.values = this.values;
        item.children = this.children;
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
        if (this.children == null) {
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

    public getOpeningBrace(): Literal | null {
        return this.openingBrace;
    }

    public getClosingBrace(): Literal | null {
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
}

interface ParserState {
    currentParent: Item | null;
    keyToken: Token | null;
    valueTokens: Token[];
    conditionToken: Token | null;

    errors: Array<ParseError>;
    roots: Array<Item>;
}

export const KvParser = {
    parseText(text: string): Document {
        const tokens = KvTokenizer.tokenize(text);
        const document = _parseTokensInternal(tokens);
        return document;
    },
    parseTokens(tokens: TokenList): Document {
        return _parseTokensInternal(tokens);
    },
};

export function _parseTokensInternal(tokens: TokenList): Document {
    const state = {
        conditionToken: null,
        currentParent: null,
        keyToken: null,
        valueTokens: [],
        errors: new Array<ParseError>(),
        roots: new Array<Item>(),
    } as ParserState;

    for (const token of tokens) {
        // Ignore comments
        if (token.type === TokenType.Comment) continue;

        // KV set is done
        completeOutstandingKvSet(state, token);

        if (token.type === TokenType.Key) {
            state.keyToken = token;
            state.valueTokens = [];
            continue;
        }

        if (token.type === TokenType.Value) {
            if (state.keyToken == null) {
                // This should never happen, but just in case.
                continue;
            }

            state.valueTokens.push(token);
            continue;
        }

        if (token.type === TokenType.ObjectStart) {
            if (state.keyToken == null) {
                const error = new ParseError(ParseErrorType.UnexpectedOpeningBrace, token.getPosition());
                state.errors.push(error);
                continue;
            }
            const key = state.keyToken.toLiteral();
            const condition: Conditional | undefined = state.conditionToken?.toConditional();
            const item = Item.createContainer(state.currentParent, key, [], condition);
            item.startPopulatingContainer(token.toLiteral());

            if (state.currentParent == null) {
                state.currentParent = item;
                state.roots.push(item);
            } else {
                state.currentParent.addChild(item);
                state.currentParent = item;
            }

            state.keyToken = null;
            state.conditionToken = null;
            continue;
        }

        if (token.type === TokenType.ObjectEnd) {
            if (state.currentParent == null) {
                const error = new ParseError(ParseErrorType.UnexpectedClosingBrace, token.getPosition());
                state.errors.push(error);
            } else {
                state.currentParent.endPopulatingContainer(token.toLiteral());
                state.currentParent = state.currentParent.getParent();
            }

            continue;
        }

        if (token.type === TokenType.Conditional) {
            state.conditionToken = token;
            continue;
        }
    }

    if (state.keyToken != null) {
        if (state.currentParent == null) {
            const pos = getKvSetPosition(state);
            if (pos != null) {
                state.errors.push(new ParseError(ParseErrorType.MissingRootObject, pos));
            }
        }
    }

    return new Document(state.roots, state.errors);
}

function getKvSetPosition(s: ParserState): Position | null {
    if (s.keyToken == null) return null;
    let end: number;

    if (s.valueTokens.length > 0) {
        end = s.valueTokens[s.valueTokens.length - 1].range.getEnd();
    } else {
        end = s.keyToken.range.getEnd();
    }

    const range = new Range(s.keyToken.range.getStart(), end);
    return new Position(s.keyToken.line, range);
}

function completeOutstandingKvSet(s: ParserState, token: Token): void {
    if (s.keyToken == null || s.keyToken.line === token.line || token.type === TokenType.ObjectStart) return;

    if (s.valueTokens.length == 0) {
        const error = new ParseError(ParseErrorType.MissingValue, s.keyToken.getPosition());
        s.errors.push(error);
    }

    if (s.currentParent == null) {
        const pos = getKvSetPosition(s);
        if (pos != null) {
            s.errors.push(new ParseError(ParseErrorType.MissingRootObject, pos));
        }
    } else {
        const key = s.keyToken.toLiteral();
        const values = s.valueTokens.map((t) => new Literal(new Position(t.line, t.range), t.value));
        const condition: Conditional | undefined = s.conditionToken?.toConditional();
        const item = Item.createLeaf(s.currentParent, key, values, condition);
        s.currentParent.addChild(item);
    }

    s.keyToken = null;
    s.valueTokens = [];
    s.conditionToken = null;
}
