import {resolveFilePath} from "./resolveFilePath";
import {resolveTemplatePathParts} from "./resolve-template-path-parts";
import {strReplaceRegexMatchFromContext} from "./strReplaceRegexMatchFromContext";
import {PathDefinitionType} from "../types/global";

export function resolveTemplatePathWithCtx(pathDefinition: PathDefinitionType, ctx: { [key: string]: any }) {
    // console.log("PathDefinition", pathDefinition)
    const destinationPath = resolveFilePath(resolveTemplatePathParts(pathDefinition))
    return strReplaceRegexMatchFromContext(destinationPath, ctx)
}