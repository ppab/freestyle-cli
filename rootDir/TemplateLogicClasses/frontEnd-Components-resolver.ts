import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityContext } from '../../src/lib/createEntityContext';

export class FrontEndComponentsResolver {
  contentDestinationTemplateString: string = `
import Slice from "../../store/{{KEBAB_CASE_ENTITY_PLURAL}}-slice"
import {BuildComponents} from "../../components/Refactor/BuildComponents";

import Schema from "./resource.schema"
import {Create{{PASCAL_CASE_ENTITY}}Dto} from "./dto/create-dto"
import create{{PASCAL_CASE_ENTITY_PLURAL}}Form from './forms/create.form'
import { listColDef } from "./col-defs/{{KEBAB_CASE_ENTITY_PLURAL}}-list.col-def";

export const {{PASCAL_CASE_ENTITY_PLURAL}}Components = BuildComponents({
    createItemForm: create{{PASCAL_CASE_ENTITY_PLURAL}}Form,
    createItemDto: Create{{PASCAL_CASE_ENTITY}}Dto,
    listColDef,
    urlBuilder: Schema.urlBuilder,
    stateKey: Schema.stateKey,
    Slice,
})

    `;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/{{PASCAL_CASE_ENTITY_PLURAL}}.components.tsx';

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
    const frontEndIndexResolver = new FrontEndComponentsResolver();
    frontEndIndexResolver.addEntityFormatsToCtx(entity, entityPlural);
    frontEndIndexResolver.createFile();
  }
}
