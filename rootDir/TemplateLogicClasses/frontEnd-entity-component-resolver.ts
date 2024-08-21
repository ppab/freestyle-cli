import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityContext } from '../../src/lib/createEntityContext';

export class FrontEndEntityComponentResolver {
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

  ctx: { [key: string]: string } | {} = {};

  addEntityFormatsToCtx(entity, entityPlural) {
    console.log('addEntityToScema', arguments);
    const obj = createEntityContext(entity, entityPlural);
    this.ctx = { ...this.ctx, ...obj };
  }

  createFile() {
    createFileWithCtxContent({
      contentDestination: {
        path: this.contentDestinationPath,
      },
      contentSource: this.contentDestinationTemplateString,
      ctx: this.ctx,
    });
  }

  static create(entity, entityPlural) {
    const frontEndIndexResolver = new FrontEndEntityComponentResolver();
    frontEndIndexResolver.addEntityFormatsToCtx(entity, entityPlural);
    frontEndIndexResolver.createFile();
  }
}
