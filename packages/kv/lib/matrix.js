"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatrixMatches = exports.matrixRegExp = void 0;
exports.matrixRegExp = / *\[ ((\d+(\.\d+)?|\.\d+) ?|)+\] */;
function getMatrixMatches(matrixString) {
    const matches = matrixString.match(exports.matrixRegExp);
    if (!matches)
        return {
            validFormat: false,
            values: []
        };
    const vals = matches[1].split(" ").map(v => parseFloat(v));
    return {
        validFormat: true,
        values: vals
    };
}
exports.getMatrixMatches = getMatrixMatches;
//# sourceMappingURL=matrix.js.map