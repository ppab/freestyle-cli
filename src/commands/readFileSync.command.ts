import {FileManager} from '../lib/fs-utils/FileManager';

type readFileArgs = {
    filePath: string, options?: BufferEncoding | { encoding?: BufferEncoding | null; flag?: string };
}

export function readFileSync(args: readFileArgs) {
    const {filePath, options} = args
    const fileManager = FileManager.sync()
    return fileManager.read(filePath, options)
}

