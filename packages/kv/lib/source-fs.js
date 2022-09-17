"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParentDocumentDirectory = void 0;
const path_1 = require("path");
// ==========================================================================
// Purpose:
// Utility functions to navigate in a source-engine-like filesystem.
// ==========================================================================
function getParentDocumentDirectory(path, directoryName) {
    const materialPathIndex = path.indexOf(directoryName) + directoryName.length;
    if (materialPathIndex < 0)
        return null;
    return (0, path_1.normalize)(path.substring(0, materialPathIndex));
}
exports.getParentDocumentDirectory = getParentDocumentDirectory;
//# sourceMappingURL=source-fs.js.map