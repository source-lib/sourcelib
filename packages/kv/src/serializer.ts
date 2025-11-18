export function serialize(obj: Object, options?: { name?: string, indentSpaces?: number, indentTabs?: boolean }, nestedLevel: number = 0): string {
    let indentObjStr: string = "";
    let indentStrKv: string = "";
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
        const objHasCustomToString = typeof val.toString === "function" && val.toString !== Object.prototype.toString;
        const doSerializeObj = valIsObj && !objHasCustomToString;

        if(doSerializeObj) {
            const serialized = serialize(val, { ...options, name: key }, nestedLevel + 1);
            kvLines.push(serialized);
        } else {
            const kvString = `${indentStrKv}"${key}" "${String(val)}"`;
            kvLines.push(kvString);
        }
    }
    kvLines.push(`${indentObjStr}}`);

    const fullStr = kvLines.join("\n");
    return fullStr;
}