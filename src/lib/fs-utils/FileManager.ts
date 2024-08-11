import {createFileSync} from "./create-file-sync";
import {createDirectorySync} from "./create-directory-sync";
import {fileExistsSync} from "./file-exists-sync";
import {readFileIfExistsSync} from "./read-file-if-exists-sync";
import {writeFileIfExistsSync} from "./write-file-if-exists-sync";

export class FileManager {
    static sync() {
        return new FileManager(createFileSync, fileExistsSync, createDirectorySync, readFileIfExistsSync, writeFileIfExistsSync)
    }

    constructor(private readonly createFile, private readonly fileExist, private readonly createDirectory, private readonly readFileIfExists, private readonly writeFileIfExists) {
        this.fileExist = fileExist
        this.createFile = createFile;
        this.createDirectory = createDirectory;
        this.readFileIfExists = readFileIfExists
        this.writeFileIfExists = writeFileIfExists
    }

    create(filePath: string, content: string, recursive?: boolean) {
        // Create the directory if it doesn't exist
        this.createDirectory(filePath, recursive)

        this.createFile(filePath, content)
    }

    read(filePath: string, options?: BufferEncoding | { encoding?: BufferEncoding | null; flag?: string }) {
        console.log("reading file", filePath);
        return this.readFileIfExists(filePath, options)
    }

    write(filePath: string, content: string, options?: BufferEncoding | {
        encoding?: BufferEncoding | null;
        flag?: string
    }) {
        console.log("writing file", filePath, content);
        return this.writeFileIfExists(filePath, content, options)
    }

    safeCreate(filePath, content) {
        if (this.fileExist(filePath)) return console.log(`Skipping FileCreation... ${filePath} already exists.`);

        this.create(filePath, content)

    }

    createDir(filePath, recursive = true) {
        this.createDirectory(filePath, recursive)
    }

}