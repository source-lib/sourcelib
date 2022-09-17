export declare enum ColorMatchParenthesisType {
    None = 0,
    Brackets = 1,
    Braces = 2,
    Inconsistent = 3
}
export declare class ColorMatchDescription {
    r: number;
    g: number;
    b: number;
    a: number;
    validFormat: boolean;
    valuesOutOfBounds: boolean;
    parenthesisType: ColorMatchParenthesisType;
}
export declare function getColorMatches(colorString: string): ColorMatchDescription;
