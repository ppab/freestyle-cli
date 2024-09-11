import fs from 'fs';
import path from 'path';
import { EntitySchema } from './TemplateLogicClasses/resolver-base-class';
import { TemplateResolvers } from './TemplateLogicClasses/template-resolvers';

async function loadModule(filePath: string) {
  console.log('Current working directory:', process.cwd());
  try {
    const resolvedPath = path.resolve(filePath);
    const fileExist = fs.existsSync(resolvedPath);
    console.log('fileExist', fileExist);
    return await import(resolvedPath);
  } catch (error) {
    console.error('Failed to load module', error);
  }
}

async function resolveSchemas(path) {
  const module = await loadModule(path);
  const entitySchemaList = module.entities as EntitySchema[];
  const resolvers = new TemplateResolvers(entitySchemaList);
  resolvers.resolve();
}

function main(path) {
  resolveSchemas(path);
}

const entitySchema = './rootDir/app/entities/entities.ts';
main(entitySchema);
