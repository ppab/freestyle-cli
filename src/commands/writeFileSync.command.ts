import {FileManager} from '../lib/fs-utils/FileManager';

type readFileArgs = {
    filePath: string, content: string; options?: BufferEncoding | { encoding?: BufferEncoding | null; flag?: string };
}

export function writeFileSync(args: readFileArgs) {
    const {filePath, content, options} = args
    console.log("filePathArgs->", args)
    const fileManager = FileManager.sync()
    return fileManager.write(filePath, content, options)
}

