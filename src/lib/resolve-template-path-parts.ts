export const resolveTemplatePathParts = (args: PathDefinitionType): string | string[] => {
    if (args.path) {
        return args.path
    }
    return [args?.dir ?? '', args?.fileName ?? ''].flat()
};



