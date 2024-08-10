import fs from 'fs';

type ReadFileOptions = BufferEncoding | { encoding?: BufferEncoding | null; flag?: string };

export function readFileIfExistsSync(filePath: string, options: ReadFileOptions = 'utf-8'): string | Buffer | null {
    const fileExist = fs.existsSync(filePath)
    console.log('fileExist', fileExist);
    if (!fileExist) {
        const message = `File ${filePath} does not exist`
        throw new Error(message)

    }
    return fs.readFileSync(filePath, options);
}
