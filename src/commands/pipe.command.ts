import {resolveTemplatePathWithCtx} from "../lib/resolve-template-parts-with-ctx";
import {readFileSync} from "./readFileSync.command";
import {createFileSync} from "./createFileSync.command";
import {dispatcher} from "../lib/list-dispatcher";
import {tasks} from "../tasks/tasks";
import {commandStrategies} from "./commands.strategies";

type pipeArgs = {
    commands: any[]
    ctx?: { [key: string]: any };
}

export function pipe({commands, ctx}: pipeArgs) {
    console.log("commands", commands)
    console.log("ctx", ctx)

    /***
     TODO: We must create a root object.
     each command should define where in the root object will the value will be defined,
     if not specified it will save it in
     {result:''}
     result,
     args
     ***/
    const commandDispatcher = dispatcher(commandStrategies)
    const p = commands.reduce((acc, cur) => {
        console.log("acc->", acc)
        const args = acc;
        const actionWithResolvedArgs = {...cur, ctx}
        console.log("actionWithResolvedArgs", actionWithResolvedArgs)
        actionWithResolvedArgs.args = args;
        console.log("actionWithResolvedArgs", actionWithResolvedArgs)
        return commandDispatcher({action: actionWithResolvedArgs, ctx})

    }, commands[0].args)


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