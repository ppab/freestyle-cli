import {resolveTemplatePathWithCtx} from "../lib/resolve-template-parts-with-ctx";
import {readFileSync} from "./readFileSync.command";
import {createFileSync} from "./createFileSync.command";
import {PathDefinitionType} from "../types/global";
import {strReplaceRegexMatchFromContext} from "../lib/strReplaceRegexMatchFromContext";

type createFileWithCtxArgs = {
    contentDestination: PathDefinitionType
    templateSource: PathDefinitionType,
    ctx: { [key: string]: string }
}

export function createFileWithCtx({contentDestination, templateSource, ctx}: createFileWithCtxArgs) {

    console.log("createFileWithCtx-->", ctx);
    const sourcePath = resolveTemplatePathWithCtx(templateSource, ctx)
    const content = readFileSync({filePath: sourcePath, options: 'utf-8'})
    console.log("content->>", content)
    const contentWithCtx = strReplaceRegexMatchFromContext(content, ctx)
    console.log("contentWithCtx->>", contentWithCtx)

    const destinationPath = resolveTemplatePathWithCtx(contentDestination, ctx)
    createFileSync({filePath: destinationPath, content: contentWithCtx, forceCreation: true});

}
type createFileWithCtxArgsContent = {
    contentDestination: PathDefinitionType
    contentSource:string
    ctx: { [key: string]: string }
}

export function createFileWithCtxContent({contentDestination, contentSource, ctx}: createFileWithCtxArgsContent) {


    const contentWithCtx = strReplaceRegexMatchFromContext(contentSource, ctx)
    console.log("contentWithCtx->>", contentWithCtx)

    const destinationPath = resolveTemplatePathWithCtx(contentDestination, ctx)
    createFileSync({filePath: destinationPath, content: contentWithCtx, forceCreation: true});

}

