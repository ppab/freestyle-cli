import path from "path";
import fs from "fs";


export function createDirectorySync(filePath: string, recursive: boolean = true) {
    const dirName = path.dirname(filePath)//The path.dirname() function is used to get the directory name portion of the fileName.
    fs.mkdirSync(dirName, {
        recursive, // create all the directories in the given path if they do not exist. I.E if dirname='test/folder1/subFolder'  it will create all folders that don´t exist
    });
}