import fs from 'fs';

type ReadFileOptions = BufferEncoding | { encoding?: BufferEncoding | null; flag?: string };
type writeFileIfExistsSyncArgs = {
    filePath: string;
    content: string;
    options?: ReadFileOptions;
}

export function writeFileIfExistsSync(filePath: string, content: string, options: ReadFileOptions = 'utf-8'): void {
    const fileExist = fs.existsSync(filePath)
    console.log('fileExist', fileExist);
    if (!fileExist) {
        const message = `File ${filePath} does not exist`
        throw new Error(message)

    }
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), options);
}
