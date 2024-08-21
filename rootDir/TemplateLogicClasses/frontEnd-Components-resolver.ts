import { ResolverBaseClass } from './resolver-base-class';
export class FrontEndComponentsResolver extends ResolverBaseClass {
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

  static create(entityName: { singular: string; plural: string }) {
    const resolver = new FrontEndComponentsResolver();
    resolver.setEntity(entityName);
    resolver.execute();
  }
}
