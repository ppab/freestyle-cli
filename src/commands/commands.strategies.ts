import {createFileWithCtx} from "./createFileWithCtx.command";
import {createDir} from "./createDir.command";
import {pipe} from "./pipe.command";
import {readFileSync} from "./readFileSync.command";
import {stringTrim} from "./stringTrim.command";
import {writeFileSync} from "./writeFileSync.command";
import {readJsonFile} from "./readJsonFile.command";
import {deleteJsonKey} from "./deleteJsonKey.command";
import {addJsonKey} from "./addJsonKey.command";
import {addEntity} from "./addEntity.command";
import {createFileFromEntriesCommand} from "./createFileFromEntries.command";

export const commandStrategies =
    {
        createFileWithCtx,
        createDir,
        pipe,
        readFileSync,
        readJsonFile,
        stringTrim,
        writeFileSync,
        deleteJsonKey,
        addJsonKey,
        addEntity,
        createFileFromEntriesCommand
    }
