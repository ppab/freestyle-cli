import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityTextFormatsCtx } from '../../src/lib/createEntityTextFormatsCtx';
import { ResolverBaseClass } from './resolver-base-class';

export class FrontEndEntityComponentResolver extends ResolverBaseClass {
  contentDestinationTemplateString: string = `
    import React from "react"
    import Slice from "../../store/{{KEBAB_CASE_ENTITY_PLURAL}}-slice";
    import {GenericReduxTables2} from "../../components/GenericTable/GenericReduxTables";
    import {queryOneUrlFromSchema} from "../../components/Refactor/buildUrlPath";
    import Schema from "./resource.schema";
    import { {{CAMEL_CASE_ENTITY}}ItemColDef } from "./col-defs/{{KEBAB_CASE_ENTITY}}-item.col-def";
    export const {{PASCAL_CASE_ENTITY}} = () => {
    return <div className={"flex flex-col w-full p-4"}>
    <GenericReduxTables2
            stateKey={Schema.stateKey}
            thunks={Slice.thunks}
            colDefs={ {{CAMEL_CASE_ENTITY}}ItemColDef}
            url={queryOneUrlFromSchema(Schema)}
            editUrl={Slice.mutateUrl}
            mutateQueryParam={Slice.mutateQueryParams}
            tableType={'basic'}

        />

    </div>}
 `;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/{{PASCAL_CASE_ENTITY}}.tsx';

  static create(entityName: { singular: string; plural: string }) {
    const resolver = new FrontEndEntityComponentResolver();
    resolver.setEntity(entityName);
    resolver.execute();
  }
}
