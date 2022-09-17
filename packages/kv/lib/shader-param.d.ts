export declare class ShaderParam {
    name: string;
    type: string;
    defaultCompletion?: string | boolean | number;
    description?: string;
    wikiUri?: string;
    constructor(name: string, type: string, defaultCompletion: string, description: string, wikiUri: string);
}
export declare class ShaderParamHint {
    paramName: string;
    valueRegex: RegExp;
    constructor(paramName: string, valueRegex: RegExp);
}
