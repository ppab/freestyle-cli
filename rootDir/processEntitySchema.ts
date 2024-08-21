import fs from 'fs';
import path from 'path';
import { FormComponentResolver } from './TemplateLogicClasses/form-component-resolver';
import { FrontEndIndexResolver } from './TemplateLogicClasses/frontEnd-index-resolver';
import { FrontEndRoutesResolver } from './TemplateLogicClasses/frontEnd-routes-resolver';
import { ListColDefResolver } from './TemplateLogicClasses/list-col-def-resolver';
import { FrontEndUrlBuilderResolver } from './TemplateLogicClasses/frontEnd-urlBuilder-resolver';
import { FrontEndPagesResolver } from './TemplateLogicClasses/frontEnd-pages-resolver';
import { FrontEndComponentsResolver } from './TemplateLogicClasses/frontEnd-Components-resolver';
import { FrontEndEntityComponentResolver } from './TemplateLogicClasses/frontEnd-entity-component-resolver';
import { ItemColDefResolver } from './TemplateLogicClasses/item-col-def-resolver';
import { BackendSystemInputResolver } from './TemplateLogicClasses/backend-system-input-resolver';
import { BackendSystemInputListResolver } from './TemplateLogicClasses/backend-system-input-list-resolver';
import { FrontendAppModuleListResolver } from './TemplateLogicClasses/frontend-app-module-list-resolver';
import { FrontEndModuleResolver } from './TemplateLogicClasses/frontEnd-module-resolver';
import { FrontendStoreListResolver } from './TemplateLogicClasses/frontend-store-list-resolver';
import { FrontEndEntitySliceResolver } from './TemplateLogicClasses/frontEnd-entity-slice-resolver';

/////////
import { EnumResolver } from './TemplateLogicClasses/enum-resolver';
import { DtoResolver } from './TemplateLogicClasses/dto-resolver';
import { EntitySchema } from './TemplateLogicClasses/resolver-base-class';

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

async function processFrontEnd(
  args: ArgsSchema,
  formItemComponentResolver,
  listColDefResolver,
  itemColDefResolver,
) {}

async function processDto(args: ArgsSchema, dtoResolver: DtoResolver) {
  console.log('dto', args.dto);
  dtoResolver.addToItems(args.dto.create);
}

async function processArgs(args: ArgsSchema[], dtoResolver, argumentResolvers) {
  console.log(args);

  const processedArgs = args;

  for (const arg of args) {
    argumentResolvers.forEach((Resolver) => Resolver.processArgument(args));

    processDto(arg, dtoResolver);
  }
  return processedArgs;
}

async function processEntitySchema(
  schema,
  entityName: { singular: string; plural: string },
  argumentResolvers,
) {
  const args = schema.arguments;
  const enums = schema.enums;

  const createDtoConfig = schema.dto.find((d) => d.name === 'create');
  const createDtoResolver = new DtoResolver(
    schema.entity,
    schema.entityPlural,
    createDtoConfig.paths,
  );

  // Initiate processing arguments->>>>
  //----------------------------------------------------------
  processArgs(args, createDtoResolver, argumentResolvers);
  ///---Special case

  if (enums.length > 0) {
    EnumResolver.createMultiple(enums, schema.entity, schema.entityPlural);
  }

  ////-----!SPECIAL CASE-->>>>>>>>>>> backendSystemInputResolver
  createDtoResolver.execute();
  createDtoResolver.createMultiple();
}

const entityNameFactory = (singular: string, plural: string) => ({
  singular,
  plural,
});

async function processEntities(path) {
  const module = await loadModule(path);
  const entities = module.entities as EntitySchema[];

  if (entities.length > 0) {
    const processMultipleEntityResolvers = [
      new BackendSystemInputListResolver(),
      new FrontendAppModuleListResolver(),
      new FrontendStoreListResolver(),
    ];
    const setEntityResolvers = [
      new FrontEndIndexResolver(),
      new FrontEndPagesResolver(),
      new FrontEndComponentsResolver(),
      new FrontEndEntityComponentResolver(),
      new FrontEndUrlBuilderResolver(),
      new FrontEndRoutesResolver(),
      new FrontEndModuleResolver(),
      new FrontEndEntitySliceResolver(),
    ];

    const argumentResolvers = [
      new FormComponentResolver(),
      new ListColDefResolver(),
      new ItemColDefResolver(),
      new BackendSystemInputResolver(),
    ];

    for (const schema of entities) {
      const entityName = entityNameFactory(schema.entity, schema.entityPlural);
      processMultipleEntityResolvers.forEach((Resolver) =>
        Resolver.processEntity(entityName),
      );
      setEntityResolvers.forEach((Resolver) => Resolver.setSchema(schema));
      argumentResolvers.forEach((Resolver) => Resolver.setSchema(schema));

      processEntitySchema(schema.entity, entityName, argumentResolvers);
    }
    const allResolvers = [
      processMultipleEntityResolvers,
      setEntityResolvers,
      argumentResolvers,
    ].flat();

    allResolvers.forEach((Resolver) => Resolver.execute());
  }
}

function main(path) {
  processEntities(path);
}

const entitySchema = './rootDir/entities/entities.ts';
main(entitySchema);
