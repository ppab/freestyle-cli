import { ResolverBaseClass } from './resolver-base-class';

export class FrontEndModuleResolver extends ResolverBaseClass {
  contentDestinationTemplateString: string = `
  import Schema from "./resource.schema"
  import {Pages} from "./Pages";
  const {{PASCAL_CASE_ENTITY_PLURAL}}Module = {
    Pages,
    Schema
  }
  export default {{PASCAL_CASE_ENTITY_PLURAL}}Module
 `;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/{{PASCAL_CASE_ENTITY_PLURAL}}.module.ts';
}
