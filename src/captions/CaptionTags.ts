export interface CaptionColorTag {
    color: CaptionColor;

    // These ranges start at the keyvalue value index!
    start: number;
    end: number;
}

export interface CaptionColor {
    r: number;
    g: number;
    b: number;
}

export const CaptionTags = {
    getColorTags(line: string): CaptionColorTag[] {
        const colorTags: CaptionColorTag[] = [];

        const clrMatches = [...line.matchAll(/<clr:(\d{1,3}),(\d{1,3}),(\d{1,3})>/g)];
        clrMatches.forEach((match) => {
            const color: CaptionColor = {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3]),
            };

            const wholeString = match[0];
            const posStart = line.indexOf(wholeString);
            const posEnd = posStart + wholeString.length;

            const start = posStart + 5;
            const end = posEnd - 1;
            colorTags.push({ color, start, end });
        });

        const playerclrMatches = [
            ...line.matchAll(/<playerclr:(\d{1,3}),(\d{1,3}),(\d{1,3}):(\d{1,3}),(\d{1,3}),(\d{1,3})>/g),
        ];
        playerclrMatches.forEach((match) => {
            const color1: CaptionColor = { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
            const color2: CaptionColor = { r: parseInt(match[4]), g: parseInt(match[5]), b: parseInt(match[6]) };

            const start1 = line.indexOf(":") + 1;
            const end1 = line.lastIndexOf(":");
            const end2 = line.lastIndexOf(match[6]) + match[6].length; // Javascript, why don't you just allow me to get the index of the match?

            colorTags.push({ color: color1, start: start1, end: end1 }, { color: color2, start: end1 + 1, end: end2 });
        });

        return colorTags;
    },
};
