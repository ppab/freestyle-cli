import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityContext } from '../../src/lib/createEntityContext';

export class FrontEndEntitySliceResolver {
  contentDestinationTemplateString: string = `
   import {genericSliceAndActions} from "./generic-slice-and-actions";
import {apiURL_Nest} from "../Util/apiURL";
import {{PASCAL_CASE_ENTITY}}Schema from "../modules/{{PASCAL_CASE_ENTITY_PLURAL}}/resource.schema"

export type {{PASCAL_CASE_ENTITY}} = {
    id: string;
    name: string;
}

const {sliceThunks, storeConfig, slice} =
    genericSliceAndActions<{{PASCAL_CASE_ENTITY}}>({{PASCAL_CASE_ENTITY}}Schema.name)


export const mutateUrl = \`\${apiURL_Nest()}invoice-notes\`
export const mutateQueryParams = '?relations=customer' //\`?relations=invoiceNoteCategory\`

export default {
    stateKey: {{PASCAL_CASE_ENTITY}}Schema.stateKey,
    reducer:slice.reducer,
    actions: slice.actions,
    thunks: sliceThunks,
    mutateUrl,
    mutateQueryParams,
}

 `;
  contentDestinationPath: string =
    './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/frontend/store/store.ts';

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
    const frontEndIndexResolver = new FrontEndEntitySliceResolver();
    frontEndIndexResolver.addEntityFormatsToCtx(entity, entityPlural);
    frontEndIndexResolver.createFile();
  }
}
