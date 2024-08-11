import {resolveTemplatePathWithCtx} from "../lib/resolve-template-parts-with-ctx";
import {readFileSync} from "./readFileSync.command";
import {createFileSync} from "./createFileSync.command";
import {tasks} from "../tasks/tasks";
import {commandStrategies} from "./commands.strategies";


export function stringTrim(args) {

    console.log("args-StringTrim->", args)
    console.log("args-StringTrim->", args)
    console.log("args-StringTrim->", args)
    return String(args).trim()

}


// {
//     "name": "readFileSync",
//     "args": {
//     "contentDestination": {
//         "path": "./src/templates/entities.json"
//     },
//     "templateSource": {
//         "path": "./src/templates/entities.json"
//     }
// }
// }