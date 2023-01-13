import { isWhitespace } from "./string-util";
import { performance } from "perf_hooks";
import { TokenList, TokenType, Token, Range } from "./parser-types";

const preprocessorRegex = /#(base|include)/;

const tokenizeFileFunction = performance.timerify(tokenizeInternal);
export function tokenize(text: string): TokenList {
    return tokenizeFileFunction(text);
}

/**
 * Sets basic tokens for the file provided. The semantic token provider must do analysis on these, as it's not done here. These tokens could be in illegal positions, but since we might want to do different analysis depending on the keyvalue format (eg VMT), it's better to analyse later.
 * @param text The text of the file to tokenize
 */
function tokenizeInternal(text: string): TokenList {
    const textSize = text.length;
    const tokenList = new TokenList();
    
    let line = 0;
    let lineColumn = -1;
    let expectingKey = true;
    for(let i = 0; i < textSize; i++) {
        const c = text[i];
        lineColumn++;

        // Skip forward to the next interesting token
        if(c === " " || c === "\t") continue;
        if(c === "\r" || c === "\n") {
            if(c === "\n") {
                line++;
                lineColumn = -1;
            }
            expectingKey = true;
            continue;
        }

        // FIXME: Possible array out of bounds error here
        // Is it a comment?
        if(c === "/" && text[i + 1] === "/") {
            const commentLength = consumeComment(text, i + 2);
            tokenList.push(new Token(TokenType.Comment, 
                new Range(lineColumn, lineColumn + commentLength), 
                text.substring(i, i + commentLength + 1),
                line));
            i += commentLength;
            lineColumn += commentLength;
            continue;
        }

        // Is it an object?
        if(c === "{") {
            tokenList.push(new Token(TokenType.ObjectStart, 
                new Range(lineColumn), 
                text[i],
                line));
            expectingKey = true;
            continue;
        }
        if(c === "}") {
            tokenList.push(new Token(TokenType.ObjectEnd, 
                new Range(lineColumn), 
                text[i],
                line));
            continue;
        }

        // Is it a conditional?
        if(c === "[") {
            const conditionalLength = consumeConditional(text, i);
            tokenList.push(new Token(TokenType.Conditional, 
                new Range(lineColumn, lineColumn + conditionalLength), 
                text.substring(i, i + conditionalLength),
                line));
            i += conditionalLength;
            expectingKey = true;
            continue;
        }

        // No, it's a string!
        const stringLength = consumeString(text, i);
        const stringContent = text.substring(i, i + stringLength + 1);
        let tokenType = expectingKey ? TokenType.Key : TokenType.Value;

        // Are we a preprocessor key?

        if(expectingKey && stringContent.match(preprocessorRegex)) {
            tokenType = TokenType.PreprocessorKey;
        }

        tokenList.push(new Token(tokenType, 
            new Range(lineColumn, lineColumn + stringLength), 
            stringContent,
            line));
        if(expectingKey) expectingKey = false;
        i += stringLength; // Prevents skipping the next character after the string
        lineColumn += stringLength;
        continue;
    }

    return tokenList;
}

export function consumeComment(text: string, i: number): number {
    let n = 1;
    let c = text[i];
    for(; c != null; c = text[i + n++]) {
        if(c === "\n" || c === "\r") {
            break;
        }
    }

    return n;
}

export function consumeConditional(text: string, i: number): number {
    let n = 1;
    let c = text[i];
    for(; c != null; c = text[i + n++]) {
        if(c === "]" || c === "\n" || c === "\r") {
            break;
        }
    }
    return n;
}

export function consumeString(text: string, i: number): number {
    const c = text[i];

    // Is it quoted?
    if(c === "\"" || c === "'") {
        return consumeStringQuoted(text, i + 1, c);
    } else {
        return consumeStringUnquoted(text, i + 1);
    }


}

export function consumeStringQuoted(text: string, i: number, startingQuote: string): number {
    let n = 1;
    let escaped = false;
    let c = text[i];
    for(; c != null; c = text[i + n++]) {
        if(c === "\n") {
            return n - 1;
        }
        if(c === "\\") {
            escaped = !escaped;
            continue;
        }

        if(c === startingQuote) {
            if(escaped) {
                escaped = false;
                continue;
            } else {
                break;
            }
        } else {
            if(escaped) escaped = false;
        }
    }

    return n;
}

export function consumeStringUnquoted(text: string, i: number): number {
    let n = 0;
    for(; i + n < text.length && !isWhitespace(text[i + n]); n++);
    return n;
}

