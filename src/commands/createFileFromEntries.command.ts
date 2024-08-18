import {readJsonFile} from "./readJsonFile.command";
import {createFileWithCtx} from "./createFileWithCtx.command";

export function createFileFromEntriesCommand(args) {
    const {entities, frontEndModule} = args
    const {contentDestination, templateSource} = frontEndModule
    const json = readJsonFile(entities)

    for (const key in json) {
        console.log("iterating over json->>", JSON.stringify(key));
        const args = {contentDestination, templateSource, ctx: json[key]}
        createFileWithCtx(args)

    }

}


