import { ResolverBaseClass } from './resolver-base-class';
//TODO: Does this work??
export class BackendSystemInputResolver extends ResolverBaseClass {
  contentDestinationTemplateString: string = `
  import { SystemInput } from '../bin/nestjs-typeorm-crud/types';
  
  export const SI{{PASCAL_CASE_ENTITY}}: SystemInput ={{ENTITIES_DEFINITIONS}} 
    `;
  contentDestinationPath: string =
    './rootDir/dist/backend/system-inputs/{{PASCAL_CASE_ENTITY_PLURAL}}.ts';

  dtoCreate = [];
  enums = [];
  typeOrmProperties = [];
  typeOrm: { [key: string]: any };

  processArgument(args) {
    const typeOrmPath = args.backend.typeOrm;
    const dtoCreatePath = args.dto.create;

    this.addTypeOrmProperties(typeOrmPath);
    this.addToDtoCreate(dtoCreatePath);
  }

  addTypeOrmProperties(value) {
    this.typeOrmProperties.push(value);
  }

  addToDtoCreate(value) {
    this.dtoCreate.push(value);
  }

  setSqlTable() {
    const updatedSchema = { ...this.schema };
    updatedSchema.backend.typeOrm.sqlTable = this.resolveStrWithCtx(
      this.schema.backend.typeOrm.sqlTable,
    );
    this.schema = updatedSchema;
  }

  finalizeCtx() {
    this.setSqlTable();

    const obj = {
      entity: this.schema.entity,
      entityPlural: this.schema.entityPlural,
      enums: this.schema.enums.map((item) => {
        return {
          name: item.name,
          values: item.values,
        };
      }),
      dto: {
        create: this.dtoCreate,
      },
      typeOrm: {
        entityClassDecorator: this.schema.backend.typeOrm.entityClassDecorator,
        sqlTable: this.schema.backend.typeOrm.entityClassDecorator,
        properties: this.typeOrmProperties,
      },
    };
    this.addToCtx('ENTITIES_DEFINITIONS', JSON.stringify(obj));
  }
}
