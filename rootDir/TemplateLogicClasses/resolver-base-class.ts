import genericSchema from '../app/entities/emails/email.entity-schema';
import {
  createEntityTextFormatsCtx,
  EntityTextFormatsCtx,
} from '../../src/lib/createEntityTextFormatsCtx';
import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { StringWithEntityCtxResolver } from './string-with-entity-ctx-resolver';
import { strReplaceRegexMatchFromContextRemoveString } from '../../src/lib/strReplaceRegexMatchFromContext';

export type EntitySchema = typeof genericSchema;

export class ResolverBaseClass {
  protected schema: EntitySchema;
  protected entityName: { singular: string; plural: string };
  protected ctx: { [key: string]: string } = {};

  protected contentDestinationPath: string;
  protected contentDestinationTemplateString: string;
  protected entityTextFormats: EntityTextFormatsCtx;

  protected setContentDestinationPath(value: string) {
    this.contentDestinationPath = value;
  }

  public setSchema(schema: EntitySchema) {
    this.schema = schema;
    this.setEntity(this.entityNameFactory(schema.entity, schema.entityPlural));
    this.entityTextFormats = createEntityTextFormatsCtx(
      schema.entity,
      schema.entityPlural,
    );
  }

  protected setEntity(entityName: { singular: string; plural: string }) {
    this.entityName = entityName;
  }

  private entityNameFactory = (singular: string, plural: string) => ({
    singular,
    plural,
  });

  protected addEntityFormatsToCtx() {
    const obj = createEntityTextFormatsCtx(
      this.entityName.singular,
      this.entityName.plural,
    );
    this.ctx = { ...this.ctx, ...obj };
  }

  protected resolveStrWithCtx(str: string) {
    return StringWithEntityCtxResolver.execute(this.entityName, str);
  }

  createFile() {
    console.log('creatingFile-->>>');
    createFileWithCtxContent({
      contentDestination: {
        path: this.contentDestinationPath,
      },
      contentSource: this.contentDestinationTemplateString,
      ctx: this.ctx,
    });
  }

  protected finalizeCtx(args?: any) {}

  addToCtx(key, value) {
    this.ctx[key] = value;
  }

  public execute() {
    this.addEntityFormatsToCtx();
    this.finalizeCtx();
    this.createFile();
  }

  replaceString(str, content, regex) {
    return strReplaceRegexMatchFromContextRemoveString(str, content, regex);
  }
}
