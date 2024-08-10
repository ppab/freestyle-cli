import fs from "fs";

export function createFileSync(filePath: string, content: string) {
    fs.writeFileSync(filePath, content.trim());
}