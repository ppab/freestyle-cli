import { createEntityContext } from '../../src/lib/createEntityContext';
import { strReplaceRegexMatchFromContextRemoveString } from '../../src/lib/strReplaceRegexMatchFromContext';
import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { resolveType } from '../../src/factories/update.factory';
import { colDefFieldFactory } from '../../src/factories/frontend/components/col-defs/colDefField.factory';
import { colDefItemComponentsFactory } from '../../src/factories/frontend/components/col-defs/colDefItemComponents.factory';

export class ItemColDefResolver {
  contentDestinationTemplateString: string = `
type anyKey = { [key: string]: any };
type AgiGridReactHOC = 'LinkButton' | 'DeleteButton';
type AgiGridReactHelpers = 'reduxValueSetter' | 'reduxValueSetter2';
type cellRenderer = [AgiGridReactHOC, anyKey];
type valueSetter = [AgiGridReactHelpers, anyKey];
type coldDefType = {
  headerName?: string;
  cellRenderer?: cellRenderer;
  editable?: boolean; // if editable is not defined system defaults to 'editable:false'
  field?: string;
  valueSetter?: valueSetter; // if valueSetter is defined system defaults to 'editable:true',
}; 
  {{ITEM_COL_DEFS_IMPORTS}}
  
  export const {{KEBAB_CASE_ENTITY}}ItemColDef : coldDefType[][] =  {{ITEM_COL_DEFS}};
    `;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/col-defs/{{KEBAB_CASE_ENTITY}}-item.col-def.ts';

  items: any[] = [];
  otherItems: any[] = [];
  ctx: { [key: string]: string } | {} = {};
  importDefs: string[] = [];
  formItemVariables: [string, string][] = [];
  formItemsResolved: string = '';

  resolveEnums(item) {
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
    console.log('adding to Items->>>', value);
    console.log('adding to Items->>>', value);
    console.log('adding to Items->>>', value);
    console.log('adding to Items->>>', value);
    console.log('adding to Items->>>', value);
    console.log('adding to Items->>>', value);
    this.items.push(value);
  }

  replaceString(str, content, regex) {
    return strReplaceRegexMatchFromContextRemoveString(str, content, regex);
  }

  processAllItems() {
    console.log('proces-->this.items', this.items);
    const itemsArr = this.items;
    return itemsArr.map((arrItem) => {
      console.log('arrItem-->>>', arrItem);
      const allItems = this.otherItems
        .map((item: any) => {
          if (typeof item === 'string') {
            //TODO: make this return dynamic, based on the provided string such as '$.input'
            return arrItem;
          }
          return item;
        })
        .flat();

      console.log('here-->>>');
      console.log('here-->>>');
      console.log('items->>', allItems);
      console.log('here-->>>');

      return allItems.map((item) => {
        if (item?.field) {
          console.log('itemField->', item);
          return item;
        }
        if (item?.component) {
          const { component } = item;
          return colDefItemComponentsFactory(component, item?.args);
        }
      });
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
    console.log('finalizeCTx->');
    console.log('finalizeCTx->');
    console.log('finalizeCTx->');
    console.log('this.items->', this.items);

    const resolvedFormItems = this.replaceFormItemsVariables();
    const itemColDefsImports =
      this.importDefs.length > 0 ? this.importDefs.join(';\n') : ' ';
    this.addToCtx('ITEM_COL_DEFS_IMPORTS', itemColDefsImports);
    this.addToCtx('ITEM_COL_DEFS', resolvedFormItems);
    console.log('ctx in Item->', this.ctx);
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
