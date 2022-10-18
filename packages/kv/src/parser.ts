import { tokenize } from "./tokenizer";
import { Conditional, Document, Item, ParseError, ParseErrorType, Position, PositionedLiteral, Range, Token, TokenList, TokenType } from "./parser-types";

export function parseText(text: string): Document {
    const tokens = tokenize(text);
    const document = parseTokens(tokens);
    return document;
}

export function parseTokens(tokens: TokenList): Document {
    
    const errors = new Array<ParseError>();
    const roots = new Array<Item>();

    let currentParent: Item | null = null;
    let keyToken: Token | null = null;
    let valueTokens: Token[] = [];
    let conditionToken: Token | null = null;

    for(const token of tokens) {
        // Ignore comments
        if(token.type === TokenType.Comment) {
            continue;
        }

        // KV set is done
        if(keyToken != null && keyToken.line !== token.line) {
            if(valueTokens.length == 0) {
                
                const error = new ParseError(ParseErrorType.MissingValue, new Position(keyToken.line, keyToken.range));
                errors.push(error);
            }

            if(currentParent == null) {
                let end: number; // This code is copy pasted from down below. Definitely need to refactor this parser
                if(valueTokens.length > 0) {
                    end = valueTokens[valueTokens.length - 1].range.end;
                } else {
                    end = keyToken.range.end;
                }
                const error = new ParseError(ParseErrorType.MissingRootObject, new Position(keyToken.line, new Range(keyToken.range.start, end)));
                errors.push(error);
            } else {
                const key = new PositionedLiteral(new Position(keyToken.line, keyToken.range), keyToken.value);
                const values = valueTokens.map(t => new PositionedLiteral(new Position(t.line, t.range), t.value));
                const condition: Conditional | null = conditionToken == null ? null : new Conditional(conditionToken.value, new Position(conditionToken.line, conditionToken.range));
                const item = Item.createLeaf(currentParent, key, values, condition);
                currentParent.addChild(item);
            }

            keyToken = null;
            valueTokens = [];
            conditionToken = null;
        }

        if(token.type === TokenType.Key) {
            keyToken = token;
            valueTokens = [];
            continue;
        }

        if(token.type === TokenType.Value) {
            if(keyToken == null) {
                // This should never happen, but just in case.
                continue;
            }

            valueTokens.push(token);
            continue;
        }

        if(token.type === TokenType.ObjectStart) {
            if(keyToken == null) {
                const error = new ParseError(ParseErrorType.UnexpectedOpeningBrace, new Position(token.line, token.range));
                errors.push(error);
                continue;
            }
            const key = new PositionedLiteral(new Position(keyToken.line, keyToken.range), keyToken.value);
            const condition: Conditional | null = conditionToken == null ? null : new Conditional(conditionToken.value, new Position(conditionToken.line, conditionToken.range));
            const item = Item.createContainer(currentParent, key, [], condition);

            if(currentParent == null) {
                currentParent = item;
                roots.push(item);
            } else {
                currentParent.addChild(item);
                currentParent = item;
            }

            keyToken = null;
            conditionToken = null;
            continue;
        }

        if(token.type === TokenType.ObjectEnd) {
            if(currentParent == null) {
                const error = new ParseError(ParseErrorType.UnexpectedClosingBrace, new Position(token.line, token.range));
                errors.push(error);
            } else {
                currentParent = currentParent.getParent();
            }

            continue;
        }

        if(token.type === TokenType.Conditional) {
            conditionToken = token;
            continue;
        }

    }

    if(keyToken != null) {
        if(currentParent == null) {
            let end: number;
            if(valueTokens.length > 0) {
                end = valueTokens[valueTokens.length - 1].range.end;
            } else {
                end = keyToken.range.end;
            }
            errors.push(new ParseError(ParseErrorType.MissingRootObject, new Position(keyToken.line, new Range(keyToken.range.start, end))));
        }
    }

    return new Document(roots, errors);
}
