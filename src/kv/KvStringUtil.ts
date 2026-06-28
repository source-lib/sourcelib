const regexScalar = /^((0?\.\d+)|([10]?\.\d+)|[01])$/;
const regexFloat = /^-?((\d+)|(\d*\.\d+))$/;
const regexInteger = /^-?\d+$/;

function _isRegexMatch(str: string, regex: RegExp) {
    const matches = str.match(regex);
    return matches != null;
}

export const KvStringUtil = {
    isWhitespace(char: string): boolean {
        return char === " " || char === "\t" || char === "\n" || char === "\r";
    },

    isQuoted(text: string): boolean {
        return (text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"));
    },

    stripQuotes(text: string): string {
        if (KvStringUtil.isQuoted(text)) {
            return text.substring(1, text.length - 1);
        } else return text;
    },

    isFloatValue(n: string): boolean {
        return _isRegexMatch(n, regexFloat);
    },

    isIntegerValue(n: string): boolean {
        return _isRegexMatch(n, regexInteger);
    },

    isScalarValue(n: string): boolean {
        return _isRegexMatch(n, regexScalar);
    },
};
