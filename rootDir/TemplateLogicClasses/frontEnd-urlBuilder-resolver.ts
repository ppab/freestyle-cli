import { createEntityTextFormatsCtx } from '../../src/lib/createEntityTextFormatsCtx';
import { urlBuilderFactory } from '../../src/factory/url-builder.factory';
import { ResolverBaseClass, EntitySchema } from './resolver-base-class';

export class FrontEndUrlBuilderResolver extends ResolverBaseClass {
  resolvedRoutes: any = [];

  contentDestinationTemplateString: string = `
   export default {{URL_BUILDER}}
    `;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/url-builder.ts';

  finalizeCtx() {
    const textFormats = createEntityTextFormatsCtx(
      this.schema.entity,
      this.schema.entityPlural,
    );
    const resolvedUrlBuilder = urlBuilderFactory
      .generic({
        relations: this.schema.frontEnd.urlBuilder.relations,
        KEBAB_CASE_ENTITY_PLURAL: textFormats.KEBAB_CASE_ENTITY_PLURAL,
      })
      .build();
    this.addToCtx('URL_BUILDER', JSON.stringify(resolvedUrlBuilder));
  }

  static create(schema: EntitySchema) {
    const frontEndRoutesResolver = new FrontEndUrlBuilderResolver();
    frontEndRoutesResolver.setSchema(schema);
    frontEndRoutesResolver.execute();
  }
}
