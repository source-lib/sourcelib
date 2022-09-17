export declare class ClrTagInfo {
    color: Color;
    start: number;
    end: number;
    constructor(color: Color, start: number, end: number);
}
export declare class Color {
    r: number;
    g: number;
    b: number;
    constructor(r: number, g: number, b: number);
}
export declare function populateColorTagMatches(line: string): ClrTagInfo[];
