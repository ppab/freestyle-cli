import fs from 'fs';
import path from 'path';
import { FormComponentResolver } from './TemplateLogicClasses/form-component-resolver';
import { EnumResolver } from './TemplateLogicClasses/enum-resolver';
import { FrontEndIndexResolver } from './TemplateLogicClasses/frontEnd-index-resolver';
import { FrontEndRoutesResolver } from './TemplateLogicClasses/frontEnd-routes-resolver';
import { ListColDefResolver } from './TemplateLogicClasses/list-col-def-resolver';
import { FrontEndUrlBuilderResolver } from './TemplateLogicClasses/frontEnd-urlBuilder-resolver';
import { FrontEndPagesResolver } from './TemplateLogicClasses/frontEnd-pages-resolver';
import { FrontEndComponentsResolver } from './TemplateLogicClasses/frontEnd-Components-resolver';
import { DtoResolver } from './TemplateLogicClasses/dto-resolver';
import { FrontEndEntityComponentResolver } from './TemplateLogicClasses/frontEnd-entity-component-resolver';
import { ItemColDefResolver } from './TemplateLogicClasses/item-col-def-resolver';
import It = jest.It;
import { FrontEndEntitySliceResolver } from './TemplateLogicClasses/frontEnd-entity-slice-resolver';
import { BackendSystemInputResolver } from './TemplateLogicClasses/backend-system-input-resolver';

type ArgsSchema = {
  name: string;
  type: string;
  dto: any;
  backend: any;
  frontEnd: any;
};

async function loadModule(filePath: string) {
  console.log('Current working directory:', process.cwd());

  try {
    const resolvedPath = path.resolve(filePath);
    const fileExist = fs.existsSync(resolvedPath);
    console.log('fileExist', resolvedPath);
    return await import(resolvedPath);
  } catch (error) {
    console.error('Failed to load module', error);
  }
}

async function processFrontEndListItem(
  formArgs: any,
  myClass: ListColDefResolver,
) {
  myClass.processItem(formArgs);
}

async function processFrontEndComponentItem(
  formArgs: any,
  myClass: ItemColDefResolver,
) {
  myClass.addToItems(formArgs);
}

async function processFrontEnd(
  args: ArgsSchema,
  formItemComponentResolver,
  listColDefResolver,
  itemColDefResolver,
) {
  console.log('fronEnd', args.frontEnd);
  const importDefs = [];
  const enumsCtx = {};

  processFrontEndComponentForm(
    args.frontEnd.component.form,
    formItemComponentResolver,
  );

  processFrontEndComponentItem(
    args.frontEnd.component.item,
    itemColDefResolver,
  );
  processFrontEndListItem(args.frontEnd.component.list, listColDefResolver);
}

async function processFrontEndComponentForm(
  formArgs: any,
  myClass: FormComponentResolver,
) {
  myClass.processItem(formArgs);
}

async function processBackend(
  args: ArgsSchema,
  backendSystemInputResolver: BackendSystemInputResolver,
) {
  console.log('backend', args.backend);

  backendSystemInputResolver.addTypeOrmProperties(args.backend.typeOrm);
  backendSystemInputResolver.addToDtoCreate(args.dto.create);
}

async function processDto(args: ArgsSchema, dtoResolver: DtoResolver) {
  console.log('dto', args.dto);
  dtoResolver.addToItems(args.dto.create);
}

async function processArgs(
  args: ArgsSchema[],
  formComponentResolver,
  listColDefResolver,
  dtoResolver,
  itemColDefResolver,
  typeOrmResolver,
) {
  console.log(args);

  const processedArgs = args;
  for (const arg of args) {
    processBackend(arg, typeOrmResolver);
    processFrontEnd(
      arg,
      formComponentResolver,
      listColDefResolver,
      itemColDefResolver,
    );
    processDto(arg, dtoResolver);
  }
  return processedArgs;
}

async function processEntitySchema(path: string) {
  const module = await loadModule(path);
  const schema = module.default;
  const args = schema.arguments;
  const enums = schema.enums;
  const frontEndRoutes = schema.frontEnd.routes;

  const formComponentResolver = new FormComponentResolver();
  const listColDefResolver = new ListColDefResolver();
  const itemColDefResolver = new ItemColDefResolver();
  const backendSystemInputResolver = new BackendSystemInputResolver(
    schema.entity,
    schema.entityPlural,
  );
  const createDtoConfig = schema.dto.find((d) => d.name === 'create');
  const createDtoResolver = new DtoResolver(
    schema.entity,
    schema.entityPlural,
    createDtoConfig.paths,
  );

  formComponentResolver.addEntityFormatsToCtx(
    schema.entity,
    schema.entityPlural,
  );
  listColDefResolver.addEntityFormatsToCtx(schema.entity, schema.entityPlural);

  //// Initiate processing arguments->>>>
  processArgs(
    args,
    formComponentResolver,
    listColDefResolver,
    createDtoResolver,
    itemColDefResolver,
    backendSystemInputResolver,
  );
  //// Finish processing arguments->>>>

  formComponentResolver.finalizeCtx();
  formComponentResolver.createFile();

  backendSystemInputResolver.setEnums(schema.enums);
  backendSystemInputResolver.setTypeOrm(schema.backend.typeOrm);
  backendSystemInputResolver.finalizeCtx();
  backendSystemInputResolver.createFile();

  EnumResolver.createMultiple(enums, schema.entity, schema.entityPlural);

  FrontEndIndexResolver.create(schema.entity, schema.entityPlural);
  FrontEndRoutesResolver.create(
    frontEndRoutes,
    schema.entity,
    schema.entityPlural,
  );
  FrontEndUrlBuilderResolver.create(
    schema.frontEnd.urlBuilder,
    schema.entity,
    schema.entityPlural,
  );
  FrontEndPagesResolver.create(schema.entity, schema.entityPlural);
  FrontEndComponentsResolver.create(schema.entity, schema.entityPlural);
  FrontEndEntityComponentResolver.create(schema.entity, schema.entityPlural);
  FrontEndEntitySliceResolver.create(schema.entity, schema.entityPlural);

  createDtoResolver.execute();
  createDtoResolver.createMultiple();

  listColDefResolver.setOtherItems(
    schema.frontEnd.components.list.colDefinitions,
  );
  listColDefResolver.finalizeCtx();
  listColDefResolver.createFile();

  itemColDefResolver.addEntityFormatsToCtx(schema.entity, schema.entityPlural);
  itemColDefResolver.finalizeCtx();
  itemColDefResolver.createFile();
}

function main(entitySchema) {
  processEntitySchema(entitySchema);
}

const entitySchema = './rootDir/entities/emails/email.entity-schema.ts';
main(entitySchema);
