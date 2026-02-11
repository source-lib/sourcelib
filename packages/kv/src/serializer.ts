import {Document, Item, Literal} from "./parser-types";


type KvNodeValue = string | number | boolean;
type KvNode = { [key: string]: KvNodeValue | KvNodeValue[] | KvNode };


export const KvSerializer = {

    serialize(obj: Record<string, unknown>, options?: { name?: string, indentSpaces?: number, indentTabs?: boolean }, nestedLevel = 0): string {
        let indentObjStr = "";
        let indentStrKv = "";
        let indentChar = "";
        if(options?.indentTabs) {
            indentChar = "\t";
        } else {
            for (let i = 0; i < (options?.indentSpaces ?? 2); i++) {
                indentChar += " ";
            }
        }
        for (let i = 0; i < nestedLevel; i++) {
            indentObjStr += indentChar;
        }
        indentStrKv = indentObjStr + indentChar;

        const kvObjHead = `${indentObjStr}"${options?.name ?? "Object"}" {`;
        const kvLines: string[] = [kvObjHead];
        for (const [key, val] of Object.entries(obj)) {
            const valIsObj = typeof val === "object";
            const objHasCustomToString = typeof val?.toString === "function" && val.toString !== Object.prototype.toString;
            const doSerializeObj = valIsObj && !objHasCustomToString;

            if(doSerializeObj) {
                const serialized = KvSerializer.serialize(val as Record<string, unknown>, { ...options, name: key }, nestedLevel + 1);
                kvLines.push(serialized);
            } else {
                const kvString = `${indentStrKv}"${key}" "${String(val)}"`;
                kvLines.push(kvString);
            }
        }
        kvLines.push(`${indentObjStr}}`);

        const fullStr = kvLines.join("\n");
        return fullStr;
    },

    deserialize(doc: Document): KvNode[] {
        return doc.getRootItems().map(_deserializeItem).filter(i => i !== undefined) as KvNode[];
    }
};

function _deserializeItem(item: Item): KvNode | undefined {
    const children = item.getChildren();
    if (!children) {
        return;
    }

    const node: KvNode = {};
    for (const child of children) {
        const values = child.getValues();
        const hasChildren = child.getChildren() !== null;
        const name = child.getKey().getUnquotedContent();

        if(values) {
            const val = _deserializeItemValue(values);
            if (val !== undefined) {
                node[name] = val;
            }
        } else if(hasChildren) {
            const childName = child.getKey().getUnquotedContent();
            const childItem = _deserializeItem(child);
            if(childItem) {
                node[childName] = childItem;
            }
        }
    }

    return node;
}

function _deserializeItemValue(vals: Literal[]): KvNodeValue | KvNodeValue[] | undefined {
    if(vals.length === 1) {
        return _transformKvValue(vals[0].getUnquotedContent());
    } else {
        return vals.map(v => _transformKvValue(v.getUnquotedContent()));
    }
}

function _transformKvValue(val: string): KvNodeValue {
    const float = Number.parseFloat(val);
    if(!Number.isNaN(float)) {
        return float;
    }

    const int = Number.parseInt(val);
    if(!Number.isNaN(int)) {
        return int;
    }

    if(val === "true") {
        return true;
    }
    if(val === "false") {
        return false;
    }

    return val;
}
