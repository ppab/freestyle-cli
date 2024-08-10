import {FileManager} from '../lib/fs-utils/FileManager';

type createFileArgs = {
    filePath: string, content: string, forceCreation: boolean
}

export function createDir(args: createFileArgs) {
    const {filePath} = args
    const fileManager = FileManager.sync()

    fileManager.createDir(filePath)

}

