import fs from 'fs';
import path from 'path';
import { resolveType } from '../src/factories/update.factory';
import { createEntityContext } from '../src/lib/createEntityContext';
import {
  createFileWithCtx,
  createFileWithCtxContent,
} from '../src/commands/createFileWithCtx.command';
import { strReplaceRegexMatchFromContextRemoveString } from '../src/lib/strReplaceRegexMatchFromContext';
import { FormComponentResolver } from './TemplateLogicClasses/form-component-resolver';
import { EnumResolver } from './TemplateLogicClasses/enum-resolver';
import { FrontEndIndexResolver } from './TemplateLogicClasses/frontEnd-index-resolver';
import { FrontEndRoutesResolver } from './TemplateLogicClasses/frontEnd-routes-resolver';
import { ListColDefResolver } from './TemplateLogicClasses/list-col-def-resolver';
import { FrontEndUrlBuilderResolver } from './TemplateLogicClasses/frontEnd-urlBuilder-resolver';

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

async function processFrontEnd(
  args: ArgsSchema,
  formItemComponentResolver,
  listColDefResolver,
) {
  console.log('fronEnd', args.frontEnd);
  const importDefs = [];
  const enumsCtx = {};

  processFrontEndComponentForm(
    args.frontEnd.component.form,
    formItemComponentResolver,
  );
  processFrontEndListItem(args.frontEnd.component.list, listColDefResolver);
}

async function processFrontEndComponentForm(
  formArgs: any,
  myClass: FormComponentResolver,
) {
  myClass.processItem(formArgs);
}

async function processBackend(args: ArgsSchema) {
  console.log('backend', args.backend);
}

async function processDto(args: ArgsSchema) {
  console.log('dto', args.dto);
}

async function processArgs(
  args: ArgsSchema[],
  formComponentResolver,
  listColDefResolver,
) {
  console.log(args);

  const processedArgs = args;
  for (const arg of args) {
    processBackend(arg);
    processFrontEnd(arg, formComponentResolver, listColDefResolver);
    processDto(arg);
  }
  return processedArgs;
}

async function processEntitySchema(path: string) {
  const formComponentResolver = new FormComponentResolver();
  const listColDefResolver = new ListColDefResolver();
  const module = await loadModule(path);
  const schema = module.default;
  const args = schema.arguments;
  const enums = schema.enums;
  const frontEndRoutes = schema.frontEnd.routes;

  formComponentResolver.addEntityFormatsToCtx(
    schema.entity,
    schema.entityPlural,
  );
  listColDefResolver.addEntityFormatsToCtx(schema.entity, schema.entityPlural);

  processArgs(args, formComponentResolver, listColDefResolver);

  formComponentResolver.finalizeCtx();
  formComponentResolver.createFile();

  listColDefResolver.setOtherItems(
    schema.frontEnd.components.list.colDefinitions,
  );
  listColDefResolver.finalizeCtx();
  listColDefResolver.createFile();

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
}

function main(entitySchema) {
  processEntitySchema(entitySchema);
}

const entitySchema = './rootDir/entities/emails/email.entity-schema.ts';
main(entitySchema);
