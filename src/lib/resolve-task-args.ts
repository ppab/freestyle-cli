const captureGroupsToObject = (str, regex): { [key: string]: string } | null => {
    const match = str.match(regex);
    if (!match) return null
    const result = {}
    const key = match[1].toUpperCase();
    const value = match[2];
    result[key] = value
    return result

}
const parseSubcommand = (str) => {
    const subcommandRE = new RegExp(/--(\w+)=(.+)/)
    return captureGroupsToObject(str, subcommandRE)
}

const resolveSubcommands = (arr, fn) => {
    if (arr.length > 0) {
        console.log("subCommands", arr)
        return arr.map(c => fn(c)).filter(Boolean).reduce((acc, cur) => Object.assign(acc, cur), {})
    }
    return {}
}
export const resolveTaskArgs = (arr) => {
    return {ctx: resolveSubcommands(arr, parseSubcommand)}
}