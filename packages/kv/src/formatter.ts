import { Document, Item, Literal, Position, Range } from "./parser-types";

export interface FormattingOptions {
    braceOnNewline: boolean;
    alwaysQuote: boolean;
}
/*
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
}*/
/*
export function formatDocument(document: Document, options: FormattingOptions): Document {
    
}
*/

// TODO: Implement support for tab indentation and variable space amount
function getIndentSpacer(indentLevel: number) {
    return indentLevel * 4;
}

export function formatIndentation(document: Document): Document {
    
    const roots: Item[] = document.getRootItems().map(root => indentItem(root, 0));


    return new Document(roots, []);
}

// TODO: Indent conditionals
export function indentItem(item: Item, indentLevel = 0): Item {
    
    
    const indentedKey = indentKey(item.getKey(), indentLevel);
    
    if(item.isLeaf()) {
        return indentLeafValues(item, indentedKey, indentLevel);
    } else {
        return indentContainer(item, indentedKey, indentLevel);
    }
}

function indentLeafValues(item: Item, indentedKey: Literal, indentLevel: number): Item {

    indentLevel;
    let offset = indentedKey.getPosition().getRange().getEnd();

    const values: Literal[] = item.getValues()!.map((valLiteral: Literal) => {

        const v = valLiteral.copy();
        v.getPosition().getRange().moveTo(offset + 1); // TODO: Add support for different kinds of spacing between values
        offset += v.getPosition().getRange().getLength() + 1;

        return v;
    });

    return Item.createLeaf(item.getParent(), indentedKey, values, item.getCondition());
}

function indentContainer(item: Item, indentedKey: Literal, indentLevel: number): Item {
    indentLevel++;
    const children: Item[] = item.getChildren()!.map(childLiteral => indentItem(childLiteral, indentLevel));
    
    const keyEnd: number = indentedKey.getPosition().getRange().getEnd();
    const c = Item.createContainer(item.getParent(), indentedKey, children, item.getCondition());
    c.startPopulatingContainer(new Literal(new Position(indentedKey.getPosition().getLine(), new Range(keyEnd + 1, keyEnd + 2)), "{"));

    const closingBracePos = c.getClosingBrace()!.getPosition();
    const indentStart = getIndentSpacer(indentLevel);
    c.endPopulatingContainer(new Literal(new Position(closingBracePos.getLine(), new Range(indentStart, indentStart + 1)), "}"));

    return c;
}

function indentKey(key: Literal, indentLevel: number): Literal {
    const k = key.copy();
    k.getPosition().getRange().moveTo(getIndentSpacer(indentLevel));
    return k;
}
