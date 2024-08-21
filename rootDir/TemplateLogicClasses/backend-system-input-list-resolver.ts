import { GenericEntityListAndImportsTemplateResolver } from './generic-entity-list-and-imports-template-resolver';

export class BackendSystemInputListResolver extends GenericEntityListAndImportsTemplateResolver {
  //TODO in the future we could define all of these arguments in the 'GenericEntityListAndImports' constructor
  contentDestinationTemplateString: string = `
  {{IMPORTS}}
  export const systemInputs: SystemInput[]=[

   {{LIST_ITEMS}}
  ] 
    `;
  contentDestinationPath: string =
    './rootDir/dist/backend/system-inputs/system-inputs.index.ts';

  importStrTemplate =
    "import { SI{{PASCAL_CASE_ENTITY}} } from './{{PASCAL_CASE_ENTITY_PLURAL}}'";
  listStrTemplate = 'SI{{PASCAL_CASE_ENTITY}}';
}
