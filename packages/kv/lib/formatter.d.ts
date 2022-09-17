import { TokenList } from "./token";
export interface FormattingOptions {
    braceOnNewline: boolean;
    alwaysQuote: boolean;
}
export declare function formatAll(tokens: TokenList, options: FormattingOptions): string;
export declare function formatLine(tokens: TokenList, line: number, options: FormattingOptions): void;
