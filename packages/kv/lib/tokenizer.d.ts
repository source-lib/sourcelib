import { TokenList, TokenType } from "./token";
export declare class Tokenizer {
    text: string;
    _tokens: TokenList;
    _preprocessorRegex: RegExp;
    addToken(type: TokenType, start: number, end: number, value: string, line: number): void;
    get tokens(): TokenList;
    _tokenizeFileFunction: (text: string) => void;
    tokenizeFile(text: string): void;
    /**
     * Sets basic tokens for the file provided. The semantic token provider must do analysis on these, as it's not done here. These tokens could be in illegal positions, but since we might want to do different analysis depending on the keyvalue format (eg VMT), it's better to analyse later.
     * @param text The text of the file to tokenize
     */
    private tokenizeFileInternal;
    consumeComment(i: number): number;
    consumeConditional(i: number): number;
    consumeString(i: number): number;
    consumeStringQuoted(i: number, startingQuote: string): number;
    consumeStringMultiline(i: number): number;
    consumeStringUnquoted(i: number): number;
}
