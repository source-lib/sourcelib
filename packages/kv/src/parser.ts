import { Document, Item, ParseError, ParseErrorType, Position, PositionedLiteral, Token, TokenList, TokenType } from "./parser-types";

export function parse(tokens: TokenList): Document {
    
    const errors = new Array<ParseError>();
    const roots = new Array<Item>();

    let currentParent: Item | null = null;
    let keyToken: Token | null = null;
    let valueTokens: Token[] = [];

    for(const token of tokens) {
        // Ignore comments
        if(token.type == TokenType.Comment) {
            continue;
        }

        // KV set is done
        if(keyToken != null && keyToken.line != token.line) {
            if(valueTokens.length == 0) {
                const error = new ParseError(ParseErrorType.MissingValue, keyToken.range);
                errors.push(error);
            }

            const key = new PositionedLiteral(new Position(keyToken.line, keyToken.range), keyToken.value);
            const values = valueTokens.map(t => new PositionedLiteral(new Position(t.line, t.range), t.value));
            const item = Item.createLeaf(currentParent, key, values);

            if(currentParent == null) {
                const error = new ParseError(ParseErrorType.MissingRootObject, keyToken.range);
                errors.push(error);
            } else {
                currentParent.addChild(item);
            }

            keyToken = null;
        }

        if(token.type == TokenType.Key) {
            keyToken = token;
            valueTokens = [];
            continue;
        }

        if(token.type == TokenType.Value) {
            if(keyToken == null) {
                // This should never happen, but just in case.
                continue;
            }

            valueTokens.push(token);
            continue;
        }

        if(token.type == TokenType.ObjectStart) {
            if(keyToken == null) {
                const error = new ParseError(ParseErrorType.MissingKey, token.range);
                errors.push(error);
                continue;
            }
            const key = new PositionedLiteral(new Position(keyToken.line, keyToken.range), keyToken.value);
            const item = Item.createContainer(currentParent, key);

            if(currentParent == null) {
                currentParent = item;
                roots.push(item);
            } else {
                currentParent.addChild(item);
                currentParent = item;
            }

            keyToken = null;
            continue;
        }

        if(token.type == TokenType.ObjectEnd) {
            if(currentParent == null) {
                const error = new ParseError(ParseErrorType.UnexpectedClosingBrace, token.range);
                errors.push(error);
            } else {
                currentParent = currentParent.getParent();
            }

            continue;
        }

    }

    return new Document(roots, errors);
}
