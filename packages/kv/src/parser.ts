import { tokenize } from "./tokenizer";
import { Conditional, Document, Item, ParseError, ParseErrorType, Position, Literal, Range, Token, TokenList, TokenType } from "./parser-types";

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
                
                const error = new ParseError(ParseErrorType.MissingValue, keyToken.getPosition());
                errors.push(error);
            }

            if(currentParent == null) {
                let end: number; // This code is copy pasted from down below. Definitely need to refactor this parser
                if(valueTokens.length > 0) {
                    end = valueTokens[valueTokens.length - 1].range.getEnd();
                } else {
                    end = keyToken.range.getEnd();
                }
                const error = new ParseError(ParseErrorType.MissingRootObject, new Position(keyToken.line, new Range(keyToken.range.getStart(), end)));
                errors.push(error);
            } else {
                const key = keyToken.toLiteral();
                const values = valueTokens.map(t => new Literal(new Position(t.line, t.range), t.value));
                const condition: Conditional | null = conditionToken == null ? null : conditionToken.toConditional();
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
                const error = new ParseError(ParseErrorType.UnexpectedOpeningBrace, token.getPosition());
                errors.push(error);
                continue;
            }
            const key = keyToken.toLiteral();
            const condition: Conditional | null = conditionToken == null ? null : conditionToken.toConditional();
            const item = Item.createContainer(currentParent, key, [], condition);
            item.startPopulatingContainer(token.toLiteral());

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
                const error = new ParseError(ParseErrorType.UnexpectedClosingBrace, token.getPosition());
                errors.push(error);
            } else {
                currentParent.startPopulatingContainer(token.toLiteral());
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
                end = valueTokens[valueTokens.length - 1].range.getEnd();
            } else {
                end = keyToken.range.getEnd();
            }
            errors.push(new ParseError(ParseErrorType.MissingRootObject, new Position(keyToken.line, new Range(keyToken.range.getStart(), end))));
        }
    }

    return new Document(roots, errors);
}
