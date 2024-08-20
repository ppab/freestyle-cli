import { createEntityContext } from '../../src/lib/createEntityContext';
import { strReplaceRegexMatchFromContextRemoveString } from '../../src/lib/strReplaceRegexMatchFromContext';
import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { resolveType } from '../../src/factories/update.factory';

export class FormComponentResolver {
  contentDestinationPath: string =
    './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/frontend/{{KEBAB_CASE_ENTITY_PLURAL}}/forms/create.forms.ts';

  contentDestinationTemplateString: string = `
    {{FORM_CREATE_IMPORT_DEFS}}
    const create{{PASCAL_CASE_ENTITY_PLURAL}}Form = {{FORM_CREATE_FORM_ITEMS}}
    export default create{{PASCAL_CASE_ENTITY_PLURAL}}Form
    `;

  items: any[] = [];
  ctx: { [key: string]: string } | {} = {};
  importDefs: string[] = [];
  formItemVariables: [string, string][] = [];
  formItemsResolved: string = '';

  processItem(item: any) {
    this.addToItems(item);
    const type = resolveType(item?.type);
    if (type === 'enum') {
      const enumArgs = item?.enum;
      const ctxObj = {};
      const key = `ENUM_${enumArgs.name}`;
      const value = enumArgs.name;
      const importStr = `import {${enumArgs.name}} from '${enumArgs.path}'`;
      this.addToCtx(key, value);
      const reString = `"{{${key}}}"`;
      const regex = new RegExp(reString, 'g');
      this.addToFormItemsVariables(key, regex);
      this.addToImportDefs(importStr);
    }
  }

  addEntityFormatsToCtx(entity, entityPlural) {
    console.log('addEntityToScema', arguments);
    const obj = createEntityContext(entity, entityPlural);
    this.ctx = { ...this.ctx, ...obj };
  }

  addToCtx(key, value) {
    this.ctx[key] = value;
  }

  addToFormItemsVariables(ctxKey, regex) {
    this.formItemVariables.push([ctxKey, regex]);
  }

  addToImportDefs(value: string) {
    this.importDefs.push(value);
  }

  addToItems(value: string) {
    this.items.push(value);
  }

  replaceString(str, content, regex) {
    return strReplaceRegexMatchFromContextRemoveString(str, content, regex);
  }

  replaceFormItemsVariables() {
    const formItems = JSON.stringify(this.items);
    this.formItemsResolved = formItems;
    this.formItemVariables.forEach((item) => {
      const [ctxKey, regex] = item;
      const replaceValue = this.ctx[ctxKey];
      console.log('--->-->replaceValue', replaceValue);
      this.formItemsResolved = this.replaceString(
        this.formItemsResolved,
        replaceValue,
        regex,
      );
    });
    return this.formItemsResolved;
  }

  finalizeCtx() {
    const resolvedFormItems = this.replaceFormItemsVariables();
    this.addToCtx('FORM_CREATE_IMPORT_DEFS', this.importDefs.join(';\n'));
    this.addToCtx('FORM_CREATE_FORM_ITEMS', resolvedFormItems);
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
}
