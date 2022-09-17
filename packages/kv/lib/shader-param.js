"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderParamHint = exports.ShaderParam = void 0;
class ShaderParam {
    constructor(name, type, defaultCompletion, description, wikiUri) {
        this.name = name;
        this.type = type;
        this.defaultCompletion = defaultCompletion;
        this.description = description;
        this.wikiUri = wikiUri;
    }
}
exports.ShaderParam = ShaderParam;
class ShaderParamHint {
    constructor(paramName, valueRegex) {
        this.paramName = paramName;
        this.valueRegex = valueRegex;
    }
}
exports.ShaderParamHint = ShaderParamHint;
//# sourceMappingURL=shader-param.js.map