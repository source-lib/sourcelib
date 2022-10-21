import { Document, Item, Literal, Range, TokenList, TokenType } from "./parser-types";

export interface FormattingOptions {
    braceOnNewline: boolean;
    alwaysQuote: boolean;
}

export function formatAll(tokens: TokenList, options: FormattingOptions): string {
    let indentation = 0;
    let text = "";

    for(let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        const indent = "\t".repeat(indentation);

        if(token.type === TokenType.ObjectStart) {
            indentation++;
            if(text.endsWith("\n")) {
                text += indent + "{\n";
                continue;
            }
            if(options.braceOnNewline) {
                text += "\n" + indent + "{\n";
            } else {
                text += " {\n";
            }
        } else if(token.type === TokenType.ObjectEnd) {
            indentation--;
            text += indent.substring(1) + "}\n";
        } else if(token.type === TokenType.Key || token.type === TokenType.PreprocessorKey) {
            text += indent + token.value;
        } else if(token.type === TokenType.Value) {
            text += " " + token.value + "\n";
        } else if(token.type === TokenType.Comment) {
            const comment = token.value.substring(2).trimStart();
            const putIndent = text.endsWith("\n") || (text.length === 0);
            text += (putIndent ? indent : " ") + "// " + comment + "\n";
        }

    }

    return text;
}
/*
export function formatDocument(document: Document, options: FormattingOptions): Document {
    
}
*/
export function formatIndentation(document: Document): Document {
    document.getRootItems().forEach(root => {
        indentContainer(root, 0);
    });
}

function indentContainer(item: Item, indentLevel: number, indentSpaceCount = 4): Item {
    if(item.isLeaf()) {
        indentItem(item, indentLevel);
    } else {
        const newChildren = item.getChildren()!.map(child => indentContainer(child, indentLevel, indentSpaceCount));
        item.replaceChildren(newChildren);
    }
}

export function indentItem(item: Item, indentLevel: number): Item {
    const key = item.getKey();
    key.getPosition().range = getIndentedLiteralRange(indentLevel, key);
    if(item.isLeaf()) {
        for(const valueLiteral of item.getValues()!) {
            valueLiteral.getPosition().range = getIndentedLiteralRange(indentLevel, valueLiteral);
        }
    }
}

function getIndentedLiteralRange(indentLevel: number, literal: Literal): Range {
    return new Range(literal.getPosition().getRange().getStart() + indentLevel, literal.getPosition().getRange().getEnd() + indentLevel);
}