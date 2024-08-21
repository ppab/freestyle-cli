import { GenericEntityListAndImportsTemplateResolver } from './generic-entity-list-and-imports-template-resolver';

export class FrontendStoreListResolver extends GenericEntityListAndImportsTemplateResolver {
  //TODO in the future we could define all of these arguments in the 'GenericEntityListAndImports' constructor
  contentDestinationTemplateString: string = `
  import {configureStore} from "@reduxjs/toolkit";
  {{IMPORTS}}
  export const store = configureStore({
    reducer: {
        {{LIST_ITEMS}}
    }
  })
  export type ApplicationState = ReturnType<typeof store.getState>
  export type ApplicationDispatch = typeof store.dispatch;
  export default store; 
  `;
  contentDestinationPath: string = './rootDir/dist/frontend/store/store.ts';

  importStrTemplate =
    "import {{PASCAL_CASE_ENTITY}}Slice from './{{KEBAB_CASE_ENTITY_PLURAL}}-slice'";
  listStrTemplate =
    '[{{PASCAL_CASE_ENTITY}}Slice.stateKey]: {{PASCAL_CASE_ENTITY}}Slice.reducer';
}
