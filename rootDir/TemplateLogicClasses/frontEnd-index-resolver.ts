import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityTextFormatsCtx } from '../../src/lib/createEntityTextFormatsCtx';
import { ResolverBaseClass } from './resolver-base-class';

export class FrontEndIndexResolver extends ResolverBaseClass {
  contentDestinationTemplateString: string = `
   import { listColDef } from './col-defs/{{KEBAB_CASE_ENTITY_PLURAL}}-list.col-def';
   import  createForm  from './forms/create.forms';
   import { routes } from './routes';
   import  urlBuilder  from './url-builder';
   import { appNavigation } from './appNavigation';
   import { itemColDef } from './item.col-def';
   
   export default {
   name: '{{PASCAL_CASE_ENTITY_PLURAL}}',
   stateKey: '{{CAMEL_CASE_ENTITY_PLURAL}}',
   appNavigation: appNavigation,
   urlBuilder: urlBuilder,
   routes: routes,
   colDef: {
    list: listColDef,
    item: itemColDef,
   },
   form: {
    create: createForm,
   },
};
    `;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/resource.schema.ts';

  public execute() {
    this.addEntityFormatsToCtx();
    this.createFile();
  }
  static create(entityName: { singular: string; plural: string }) {
    const resolver = new FrontEndIndexResolver();
    resolver.setEntity(entityName);
    resolver.execute();
  }
}
