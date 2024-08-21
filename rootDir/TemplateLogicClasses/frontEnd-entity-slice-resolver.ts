import { ResolverBaseClass } from './resolver-base-class';

export class FrontEndEntitySliceResolver extends ResolverBaseClass {
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
    './rootDir/dist/frontend/store/{{KEBAB_CASE_ENTITY_PLURAL}}-slice.ts';

  static create(entityName: { singular: string; plural: string }) {
    const resolver = new FrontEndEntitySliceResolver();
    resolver.setEntity(entityName);
    resolver.execute();
  }
}
