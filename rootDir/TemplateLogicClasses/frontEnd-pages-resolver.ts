import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityTextFormatsCtx } from '../../src/lib/createEntityTextFormatsCtx';
import { ResolverBaseClass } from './resolver-base-class';

export class FrontEndPagesResolver extends ResolverBaseClass {
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

  public execute() {
    this.addEntityFormatsToCtx();
    this.createFile();
  }

  static create(entityName: { singular: string; plural: string }) {
    const resolver = new FrontEndPagesResolver();
    resolver.setEntity(entityName);
    resolver.execute();
  }
}
