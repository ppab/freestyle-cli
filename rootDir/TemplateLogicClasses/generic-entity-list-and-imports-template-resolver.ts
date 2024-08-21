import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { StringWithEntityCtxResolver } from './string-with-entity-ctx-resolver';

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

  private ctx: { [key: string]: string } | {} = {};
  private importsArr = [];
  private listItems = [];

  public processEntity(entityName: { singular: string; plural: string }) {
    this.importsArr.push(this.resolveImportStr(entityName));
    this.listItems.push(this.resolveListStr(entityName));
  }

  protected resolveImportStr(entityName: { singular: string; plural: string }) {
    return StringWithEntityCtxResolver.execute(
      entityName,
      this.importStrTemplate,
    );
  }

  protected resolveListStr(entityName: { singular: string; plural: string }) {
    return StringWithEntityCtxResolver.execute(
      entityName,
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
