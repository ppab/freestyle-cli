import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityContext } from '../../src/lib/createEntityContext';

export class BackendSystemInputResolver {
  contentDestinationTemplateString: string = `
  import { SystemInput } from '../bin/nestjs-typeorm-crud/types';
  
  export const SI{{PASCAL_CASE_ENTITY}}: SystemInput ={{ENTITIES_DEFINITIONS}} 
  
 
    `;

  ctx: { [key: string]: string } | {} = {};

  dtoCreate = [];
  enums = [];
  typeOrmProperties = [];
  typeOrm: { [key: string]: any };
  private readonly contentDestinationPath: string =
    './rootDir/dist/backend/system-inputs/{{PASCAL_CASE_ENTITY_PLURAL}}.ts';

  constructor(
    private readonly entity,
    private readonly entityPlural,
  ) {
    this.entity = entity;
    this.entityPlural = entityPlural;
    this.addEntityFormatsToCtx();
  }

  addTypeOrmProperties(value) {
    this.typeOrmProperties.push(value);
  }

  addToDtoCreate(value) {
    this.dtoCreate.push(value);
  }

  setEnums(value) {
    this.enums = value;
  }

  setTypeOrm(value) {
    this.typeOrm = value;
  }

  addEntityFormatsToCtx() {
    const obj = createEntityContext(this.entity, this.entityPlural);
    this.ctx = { ...this.ctx, ...obj };
  }

  finalizeCtx() {
    const ctx = createEntityContext(this.entity, this.entityPlural);
    const obj = {
      entity: this.entity,
      entityPlural: this.entityPlural,
      enums: this.enums.map((item) => {
        return {
          name: item.name,
          values: item.values,
        };
      }),
      dto: {
        create: this.dtoCreate,
      },
      typeOrm: {
        entityClassDecorator: this.typeOrm.entityClassDecorator,
        sqlTable: ctx.LOWER_SNAKE_CASE_ENTITY_PLURAL,
        properties: this.typeOrmProperties,
      },
    };
    this.addToCtx('ENTITIES_DEFINITIONS', JSON.stringify(obj));
  }

  addToCtx(key, value) {
    this.ctx[key] = value;
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
