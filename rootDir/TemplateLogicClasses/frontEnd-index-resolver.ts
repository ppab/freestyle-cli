import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityContext } from '../../src/lib/createEntityContext';

export class FrontEndIndexResolver {
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
    './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/resource.schema.ts';

  ctx: { [key: string]: string } | {} = {};

  addEntityFormatsToCtx(entity, entityPlural) {
    console.log('addEntityToScema', arguments);
    const obj = createEntityContext(entity, entityPlural);
    this.ctx = { ...this.ctx, ...obj };
  }

  finalizeCtx() {}

  addToCtx(key, value) {
    this.ctx[key] = value;
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
    const frontEndIndexResolver = new FrontEndIndexResolver();
    frontEndIndexResolver.addEntityFormatsToCtx(entity, entityPlural);
    frontEndIndexResolver.createFile();
  }
}
