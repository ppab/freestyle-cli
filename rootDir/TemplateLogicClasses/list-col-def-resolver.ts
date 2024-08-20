import { createEntityContext } from '../../src/lib/createEntityContext';
import { strReplaceRegexMatchFromContextRemoveString } from '../../src/lib/strReplaceRegexMatchFromContext';
import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { resolveType } from '../../src/factories/update.factory';
import { colDefFieldFactory } from '../../src/factories/frontend/components/col-defs/colDefField.factory';
import { colDefItemComponentsFactory } from '../../src/factories/frontend/components/col-defs/colDefItemComponents.factory';

export class ListColDefResolver {
  contentDestinationTemplateString: string = `
  {{LIST_COL_DEFS_IMPORTS}}
  
  export const listColDef = {{LIST_COL_DEF}};
    `;
  contentDestinationPath: string =
    './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/frontend/{{KEBAB_CASE_ENTITY_PLURAL}}/col-defs/{{KEBAB_CASE_ENTITY_PLURAL}}-list.col-def.ts';

  items: any[] = [];
  otherItems: any[] = [];
  ctx: { [key: string]: string } | {} = {};
  importDefs: string[] = [];
  formItemVariables: [string, string][] = [];
  formItemsResolved: string = '';

  processItem(item: any) {
    this.addToItems(item);
    console.log('processing Item->>');
    console.log('processing Item->>');
    console.log('processing Item->>');
    console.log('processing Item->>');
    console.log('processing Item->>');
    console.log('processing Item->>');
    console.log('processing Item->>', item);
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
      console.log('enum import->>>>>', importStr);
      console.log('formItemVariables', this.formItemVariables);
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

  processAllItems() {
    const items = this.otherItems
      .map((item: any) => {
        if (typeof item === 'string') {
          //TODO: make this return dynamic, based on the provided string such as '$.input'
          return this.items;
        }
        return item;
      })
      .flat();

    console.log('here-->>>');
    console.log('here-->>>');
    console.log('items->>', items);
    console.log('here-->>>');

    return items.map((item) => {
      if (item?.field) {
        console.log('itemField->', item);
        return item;
      }
      if (item?.component) {
        const { component } = item;
        return colDefItemComponentsFactory(component, item?.args);
      }
    });
  }

  replaceFormItemsVariables() {
    console.log('items->>>>>>>');
    const processedItems = this.processAllItems();
    console.log('processed-items >>>>>', processedItems);
    const formItems = JSON.stringify(processedItems);
    this.formItemsResolved = formItems;
    this.formItemVariables.forEach((item) => {
      const [ctxKey, regex] = item;
      const replaceValue = `Object.keys(${this.ctx[ctxKey]})`;
      console.log('--->-->replaceValue', replaceValue);
      this.formItemsResolved = this.replaceString(
        this.formItemsResolved,
        replaceValue,
        regex,
      );
    });
    return this.formItemsResolved;
  }

  setOtherItems(otherItems) {
    this.otherItems = otherItems;
  }

  finalizeCtx() {
    const resolvedFormItems = this.replaceFormItemsVariables();
    this.addToCtx('LIST_COL_DEFS_IMPORTS', this.importDefs.join(';\n'));
    this.addToCtx('LIST_COL_DEF', resolvedFormItems);
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
