import fs from "fs";

export function fileExistsSync(filePath: string) {
    return fs.existsSync(filePath)
}