import { routesGenericFactory } from '../../src/factory/routes-builder.factory';
import { ResolverBaseClass } from './resolver-base-class';

export class FrontEndRoutesResolver extends ResolverBaseClass {
  resolvedRoutes: any = [];

  contentDestinationTemplateString: string = `
    export const routes = {{FRONTEND_ROUTES}};
    
    `;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/routes.ts';

  resolveRoutes() {
    const genericRoutes = [
      ...routesGenericFactory.build({
        KEBAB_CASE_ENTITY_PLURAL:
          this.entityTextFormats.KEBAB_CASE_ENTITY_PLURAL,
        PASCAL_CASE_ENTITY: this.entityTextFormats.PASCAL_CASE_ENTITY,
        PASCAL_CASE_ENTITY_PLURAL:
          this.entityTextFormats.PASCAL_CASE_ENTITY_PLURAL,
      }),
    ];

    this.resolvedRoutes = [...genericRoutes, ...this.schema.frontEnd.routes];
  }

  finalizeCtx() {
    this.resolveRoutes();
    this.addToCtx('FRONTEND_ROUTES', JSON.stringify(this.resolvedRoutes));
  }

  static create(schema) {
    const frontEndRoutesResolver = new FrontEndRoutesResolver();
    frontEndRoutesResolver.setSchema(schema);
    frontEndRoutesResolver.addEntityFormatsToCtx();
    frontEndRoutesResolver.resolveRoutes();
    frontEndRoutesResolver.finalizeCtx();
    frontEndRoutesResolver.createFile();
  }
}
