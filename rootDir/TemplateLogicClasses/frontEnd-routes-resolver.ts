import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityContext } from '../../src/lib/createEntityContext';
import { routesGenericFactory } from '../../src/factories/routes-builder.factory';

export class FrontEndRoutesResolver {
  resolvedRoutes: any = [];

  constructor(
    private readonly routes,
    private readonly entity,
    private readonly entityPlural: string,
  ) {
    routes = this.routes;
    entity = this.entity;
    entityPlural = this.entityPlural;
  }

  contentDestinationTemplateString: string = `
    export const routes = [
    {{FRONTEND_ROUTES}}
    ];
    `;
  contentDestinationPath: string =
    './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/frontend/{{KEBAB_CASE_ENTITY_PLURAL}}/routes.ts';

  ctx: { [key: string]: string } | {} = {};

  resolveRoutes() {
    const entityNameFormats = createEntityContext(
      this.entity,
      this.entityPlural,
    );
    const genericRoutes = [
      ...routesGenericFactory.build({
        KEBAB_CASE_ENTITY_PLURAL: entityNameFormats.KEBAB_CASE_ENTITY_PLURAL,
        PASCAL_CASE_ENTITY: entityNameFormats.PASCAL_CASE_ENTITY,
        PASCAL_CASE_ENTITY_PLURAL: entityNameFormats.PASCAL_CASE_ENTITY_PLURAL,
      }),
    ];

    this.resolvedRoutes = [...genericRoutes, ...this.routes];
  }

  addEntityFormatsToCtx() {
    console.log('addEntityToScema', arguments);
    const obj = createEntityContext(this.entity, this.entityPlural);
    this.ctx = { ...this.ctx, ...obj };
  }

  finalizeCtx() {
    this.addToCtx('FRONTEND_ROUTES', JSON.stringify(this.resolvedRoutes));
  }

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

  static create(frontEndRoutes, entity, entityPlural) {
    const frontEndRoutesResolver = new FrontEndRoutesResolver(
      frontEndRoutes,
      entity,
      entityPlural,
    );
    frontEndRoutesResolver.addEntityFormatsToCtx();
    frontEndRoutesResolver.resolveRoutes();
    frontEndRoutesResolver.finalizeCtx();
    frontEndRoutesResolver.createFile();
  }
}
