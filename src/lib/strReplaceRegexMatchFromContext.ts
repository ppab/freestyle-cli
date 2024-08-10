export const strReplaceRegexMatchFromContext = (str: string, ctx: { [key: string]: string }): string => {

    //The regex \{\{([^}]+)\}\} matches any text within double curly braces {{string}}.
    const regex = /\{\{([^}]+)\}\}/g;
    // for value:{{ENTITY_PLURAL}}-update-{{ENTITY}}.dto.ts
    // it will match :
    //match->>> {{ENTITY_PLURAL}} ENTITY_PLURAL
    //match->>> {{ENTITY}} ENTITY
    //"fileOutputPath": "src/testes/dto/testes-update-test.dto.ts",
    const matchFunction = (match, capturedGroup) =>
        ctx[capturedGroup] || match;
    return str.replace(regex, matchFunction);
};