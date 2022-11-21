import { tokenize } from "./tokenizer";
import { Conditional, Document, Item, ParseError, ParseErrorType, Position, Literal, Range, Token, TokenList, TokenType } from "./parser-types";

interface ParserState {
    currentParent: Item | null;
    keyToken: Token | null;
    valueTokens: Token[];
    conditionToken: Token | null;

    errors: Array<ParseError>;
    roots: Array<Item>;
}

export function parseText(text: string): Document {
    const tokens = tokenize(text);
    const document = parseTokens(tokens);
    return document;
}

export function parseTokens(tokens: TokenList): Document {

    const state = {
        conditionToken: null,
        currentParent: null,
        keyToken: null,
        valueTokens: [],
        errors: new Array<ParseError>(),
        roots: new Array<Item>()
    } as ParserState;

    for(const token of tokens) {
        // Ignore comments
        if(token.type === TokenType.Comment)
            continue;

        // KV set is done
        completeOutstandingKvSet(state, token);

        if(token.type === TokenType.Key) {
            state.keyToken = token;
            state.valueTokens = [];
            continue;
        }

        if(token.type === TokenType.Value) {
            if(state.keyToken == null) {
                // This should never happen, but just in case.
                continue;
            }

            state.valueTokens.push(token);
            continue;
        }

        if(token.type === TokenType.ObjectStart) {
            if(state.keyToken == null) {
                const error = new ParseError(ParseErrorType.UnexpectedOpeningBrace, token.getPosition());
                state.errors.push(error);
                continue;
            }
            const key = state.keyToken.toLiteral();
            const condition: Conditional | undefined = state.conditionToken?.toConditional();
            const item = Item.createContainer(state.currentParent, key, [], condition);
            item.startPopulatingContainer(token.toLiteral());

            if(state.currentParent == null) {
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

        if(token.type === TokenType.ObjectEnd) {
            if(state.currentParent == null) {
                const error = new ParseError(ParseErrorType.UnexpectedClosingBrace, token.getPosition());
                state.errors.push(error);
            } else {
                state.currentParent.endPopulatingContainer(token.toLiteral());
                state.currentParent = state.currentParent.getParent();
            }

            continue;
        }

        if(token.type === TokenType.Conditional) {
            state.conditionToken = token;
            continue;
        }

    }

    if(state.keyToken != null) {
        if(state.currentParent == null) {
            const pos = getKvSetPosition(state);
            if(pos != null) {
                state.errors.push(new ParseError(ParseErrorType.MissingRootObject, pos));
            }
        }
    }

    return new Document(state.roots, state.errors);
}

function getKvSetPosition(s: ParserState): Position | null {
    
    if(s.keyToken == null) return null;
    let end: number;
    
    if(s.valueTokens.length > 0) {
        end = s.valueTokens[s.valueTokens.length - 1].range.getEnd();
    } else {
        end = s.keyToken.range.getEnd();
    } 

    const range = new Range(s.keyToken.range.getStart(), end);
    return new Position(s.keyToken.line, range);
}

function completeOutstandingKvSet(s: ParserState, token: Token): void {
    if(s.keyToken != null && s.keyToken.line !== token.line) {
        if(s.valueTokens.length == 0) {
            
            const error = new ParseError(ParseErrorType.MissingValue, s.keyToken.getPosition());
            s.errors.push(error);
        }

        if(s.currentParent == null) {
            const pos = getKvSetPosition(s);
            if(pos != null) {
                s.errors.push(new ParseError(ParseErrorType.MissingRootObject, pos));
            }
        } else {
            const key = s.keyToken.toLiteral();
            const values = s.valueTokens.map(t => new Literal(new Position(t.line, t.range), t.value));
            const condition: Conditional | undefined = s.conditionToken?.toConditional();
            const item = Item.createLeaf(s.currentParent, key, values, condition);
            s.currentParent.addChild(item);
        }

        s.keyToken = null;
        s.valueTokens = [];
        s.conditionToken = null;
    }
}