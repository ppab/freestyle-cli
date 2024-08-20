import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityContext } from '../../src/lib/createEntityContext';
import { routesGenericFactory } from '../../src/factories/routes-builder.factory';
import urlBuilder from '../dist/emailsModule/frontend/emails/url-builder';
import { urlBuilderFactory } from '../../src/factories/url-builder.factory';

export class FrontEndUrlBuilderResolver {
  resolvedRoutes: any = [];

  constructor(
    private readonly urlBuilder,
    private readonly entity,
    private readonly entityPlural: string,
  ) {
    urlBuilder = this.urlBuilder;
    entity = this.entity;
    entityPlural = this.entityPlural;
  }

  contentDestinationTemplateString: string = `
   export default {{URL_BUILDER}}
    `;
  contentDestinationPath: string =
    './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/frontend/{{KEBAB_CASE_ENTITY_PLURAL}}/url-builder.ts';

  ctx: { [key: string]: string } | {} = {};

  addEntityFormatsToCtx() {
    console.log('addEntityToScema', arguments);
    const obj = createEntityContext(this.entity, this.entityPlural);
    this.ctx = { ...this.ctx, ...obj };
  }

  finalizeCtx() {
    const textFormats = createEntityContext(this.entity, this.entityPlural);
    const resolvedUrlBuilder = urlBuilderFactory
      .generic({
        relations: this.urlBuilder?.relations,
        KEBAB_CASE_ENTITY_PLURAL: textFormats.KEBAB_CASE_ENTITY_PLURAL,
      })
      .build();
    this.addToCtx('URL_BUILDER', JSON.stringify(resolvedUrlBuilder));
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

  static create(urlBuilder, entity, entityPlural) {
    const frontEndRoutesResolver = new FrontEndUrlBuilderResolver(
      urlBuilder,
      entity,
      entityPlural,
    );
    frontEndRoutesResolver.addEntityFormatsToCtx();
    frontEndRoutesResolver.finalizeCtx();
    frontEndRoutesResolver.createFile();
  }
}
