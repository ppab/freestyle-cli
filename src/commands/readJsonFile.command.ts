import {readFileSync} from "./readFileSync.command";
export function readJsonFile(args) {
    const value = readFileSync(args)
    return JSON.parse(value)

}


