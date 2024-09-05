import { resolveType } from '../../src/factory/update.factory';
import { ResolverBaseClass } from './resolver-base-class';

export class FormComponentResolver extends ResolverBaseClass {
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/forms/create.form.ts';

  contentDestinationTemplateString: string = `
    {{FORM_CREATE_IMPORT_DEFS}}
    const create{{PASCAL_CASE_ENTITY_PLURAL}}Form = {{FORM_CREATE_FORM_ITEMS}}
    export default create{{PASCAL_CASE_ENTITY_PLURAL}}Form
    `;

  items: any[] = [];
  importDefs: string[] = [];
  formItemVariables: [string, string][] = [];
  formItemsResolved: string = '';

  processArgument(args) {
    const item = args.frontEnd.component.form;
    this.processItem(item);
  }

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

  addToFormItemsVariables(ctxKey, regex) {
    this.formItemVariables.push([ctxKey, regex]);
  }

  addToImportDefs(value: string) {
    this.importDefs.push(value);
  }

  addToItems(value: string) {
    this.items.push(value);
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
}
