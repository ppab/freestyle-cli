import {createFileWithCtx} from "../commands/createFileWithCtx.command";

type CreateFileWithCtxArgsFactoryArgs = {
    contentDestination: PathDefinitionType
    templateSource: PathDefinitionType
    ctx: { [key: string]: string }
}
export const CreateFileWithCtxArgsFactory = ({
                                                 contentDestination,
                                                 templateSource,
                                                 ctx
                                             }: CreateFileWithCtxArgsFactoryArgs) => {

    createFileWithCtx({
        contentDestination: contentDestination,
        templateSource: templateSource,
        ctx,
    })

}