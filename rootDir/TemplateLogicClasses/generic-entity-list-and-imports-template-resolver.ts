import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { StringWithEntityCtxResolver } from './string-with-entity-ctx-resolver';
import { EntityTextFormatsCtx } from '../../src/lib/createEntityTextFormatsCtx';
import { EntitySchema, ResolverBaseClass } from './resolver-base-class';

//TODO: extend class from ResolverBaseClass
export class GenericEntityListAndImportsTemplateResolver {
  /**
   * TODO:Add the functionality to be able to read the content from:
   * *a string--DONE
   * *s3 file,
   * *local file,
   * TODO: Add Tests for this class
   **/
  protected readonly contentDestinationTemplateString: string;
  protected readonly contentDestinationPath: string;
  protected readonly importStrTemplate: string;
  protected readonly listStrTemplate: string;
  protected schema: EntitySchema;
  protected entityTextFormats: EntityTextFormatsCtx;

  private ctx: { [key: string]: string } | {} = {};
  private importsArr = [];
  private listItems = [];
  protected entityName: { singular: string; plural: string };

  public setSchema(schema: EntitySchema) {
    this.schema = schema;
    this.setEntity(this.entityNameFactory(schema.entity, schema.entityPlural));
    this.processEntity();
  }

  protected setEntity(entityName: { singular: string; plural: string }) {
    this.entityName = entityName;
  }

  private entityNameFactory = (singular: string, plural: string) => ({
    singular,
    plural,
  });

  public processEntity() {
    this.importsArr.push(this.resolveImportStr());
    this.listItems.push(this.resolveListStr());
  }

  protected resolveImportStr() {
    return StringWithEntityCtxResolver.execute(
      this.entityName,
      this.importStrTemplate,
    );
  }

  protected resolveListStr() {
    return StringWithEntityCtxResolver.execute(
      this.entityName,
      this.listStrTemplate,
    );
  }

  protected finalizeCtx() {
    this.addToCtx('IMPORTS', this.importsArr.join(' \n'));
    this.addToCtx('LIST_ITEMS', this.listItems.join(', \n'));
  }

  protected addToCtx(key, value) {
    this.ctx[key] = value;
  }

  protected createFile() {
    createFileWithCtxContent({
      contentDestination: {
        path: this.contentDestinationPath,
      },
      contentSource: this.contentDestinationTemplateString,
      ctx: this.ctx,
    });
  }

  public execute() {
    this.finalizeCtx();
    this.createFile();
  }
}
