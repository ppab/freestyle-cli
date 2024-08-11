import {FileManager} from '../lib/fs-utils/FileManager';
import {readJsonFile} from "./readJsonFile.command";
import {writeFileSync} from "./writeFileSync.command";

type readFileArgs = {
    key: string
    filePath: string,
    options?: BufferEncoding | {
        encoding?: BufferEncoding | null; flag?: string

    };
}

export function deleteJsonKey(args: readFileArgs) {
    const {filePath, options, key,} = args
    console.log("filePathArgs->", args)
    const data = readJsonFile(args);
    console.log("data->", data)
    delete data[key]
    console.log("deleting key->", key)
    console.log("data->", data)
    writeFileSync({...args, content: data,})

    const fileManager = FileManager.sync()
    return fileManager.read(filePath, options)
}

