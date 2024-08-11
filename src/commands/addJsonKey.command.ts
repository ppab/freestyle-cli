import {FileManager} from '../lib/fs-utils/FileManager';
import {readJsonFile} from "./readJsonFile.command";
import {writeFileSync} from "./writeFileSync.command";
import {strReplaceRegexMatchFromContext} from "../lib/strReplaceRegexMatchFromContext";

type readFileArgs = {
    key: string
    filePath: string,
    content: { [key: string]: any }
    ctx?: { [key: string]: any },
    options?: BufferEncoding | {
        encoding?: BufferEncoding | null; flag?: string

    };
}

export function addJsonKey(args: readFileArgs) {
    const {filePath, options, content, key,} = args
    console.log("filePathArgs->", args)
    const data = readJsonFile(args);
    console.log("data->", data)
    console.log("content->", data)
    const resolvedContentCtx = JSON.parse(strReplaceRegexMatchFromContext(JSON.stringify(content), args?.ctx))

    console.log("resolvedContentCtx", resolvedContentCtx)
    const mergedData = {...data, ...resolvedContentCtx}
    writeFileSync({...args, content: mergedData})

    const fileManager = FileManager.sync()
    return fileManager.read(filePath, options)
}

