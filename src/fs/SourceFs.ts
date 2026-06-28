import { normalize } from "pathe";

export function getParentDocumentDirectory(path: string, directoryName: string): string | null {
    const materialPathIndex = path.indexOf(directoryName) + directoryName.length;
    if (materialPathIndex < 0) return null;

    return normalize(path.substring(0, materialPathIndex));
}
