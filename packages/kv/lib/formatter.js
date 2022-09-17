"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLine = exports.formatAll = void 0;
const token_1 = require("./token");
function formatAll(tokens, options) {
    let indentation = 0;
    let text = "";
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const indent = "\t".repeat(indentation);
        if (token.type === token_1.TokenType.ObjectStart) {
            indentation++;
            if (text.endsWith("\n")) {
                text += indent + "{\n";
                continue;
            }
            if (options.braceOnNewline) {
                text += "\n" + indent + "{\n";
            }
            else {
                text += " {\n";
            }
        }
        else if (token.type === token_1.TokenType.ObjectEnd) {
            indentation--;
            text += indent.substring(1) + "}\n";
        }
        else if (token.type === token_1.TokenType.Key || token.type === token_1.TokenType.PreprocessorKey) {
            text += indent + token.value;
        }
        else if (token.type === token_1.TokenType.Value) {
            text += " " + token.value + "\n";
        }
        else if (token.type === token_1.TokenType.Comment) {
            const comment = token.value.substring(2).trimStart();
            const putIndent = text.endsWith("\n") || (text.length === 0);
            text += (putIndent ? indent : " ") + "// " + comment + "\n";
        }
    }
    return text;
}
exports.formatAll = formatAll;
function formatLine(tokens, line, options) {
    const lineTokens = tokens.getAllOnLine(line);
}
exports.formatLine = formatLine;
//# sourceMappingURL=formatter.js.map