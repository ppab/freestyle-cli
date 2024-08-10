import {resolveTemplatePathWithCtx} from "../lib/resolve-template-parts-with-ctx";
import {readFileSync} from "./readFileSync.command";
import {createFileSync} from "./createFileSync.command";

type createFileWithCtxArgs = {
    contentDestination: PathDefinitionType
    templateSource: PathDefinitionType,
    ctx: { [key: string]: string }
}

export function createFileWithCtx({contentDestination, templateSource, ctx}: createFileWithCtxArgs) {
    const sourcePath = resolveTemplatePathWithCtx(templateSource, ctx)
    const content = readFileSync({filePath: sourcePath, options: 'utf-8'})

    const destinationPath = resolveTemplatePathWithCtx(contentDestination, ctx)
    createFileSync({filePath: destinationPath, content, forceCreation: true});

}

