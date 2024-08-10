import {FileManager} from '../lib/fs-utils/FileManager';

type createFileArgs = {
    filePath: string, content: string, forceCreation: boolean
}

export function createFileSync(args: createFileArgs) {
    const {filePath, content, forceCreation} = args
    const fileManager = FileManager.sync()
    if (!forceCreation) {
        fileManager.safeCreate(filePath, content)
    }
    fileManager.create(filePath, content)

}

