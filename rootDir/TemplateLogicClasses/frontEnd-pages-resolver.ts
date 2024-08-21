import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityContext } from '../../src/lib/createEntityContext';

export class FrontEndPagesResolver {
  contentDestinationTemplateString: string = `
 import React from "react";
 import { {{PASCAL_CASE_ENTITY_PLURAL}}Components } from "./{{PASCAL_CASE_ENTITY_PLURAL}}.components";
 import { {{PASCAL_CASE_ENTITY}} } from "./{{PASCAL_CASE_ENTITY}}";
 
 export const Pages = {
   {{PASCAL_CASE_ENTITY_PLURAL}}: ({queryParameters, initialValue}) => <{{PASCAL_CASE_ENTITY_PLURAL}}Components.ListWithCreateButton
        queryParameters={queryParameters}
        initialValue={initialValue}
        urlBuilderContext={[]}
    />,
    Create{{PASCAL_CASE_ENTITY}}: ({initialValue}) => <{{PASCAL_CASE_ENTITY_PLURAL}}Components.Create
        initialValue={initialValue}
        urlBuilderContext={[]}
    />,
    {{PASCAL_CASE_ENTITY}}
}

    `;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/Pages.tsx';

  ctx: { [key: string]: string } | {} = {};

  addEntityFormatsToCtx(entity, entityPlural) {
    console.log('addEntityToScema', arguments);
    const obj = createEntityContext(entity, entityPlural);
    this.ctx = { ...this.ctx, ...obj };
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

  static create(entity, entityPlural) {
    const frontEndIndexResolver = new FrontEndPagesResolver();
    frontEndIndexResolver.addEntityFormatsToCtx(entity, entityPlural);
    frontEndIndexResolver.createFile();
  }
}
