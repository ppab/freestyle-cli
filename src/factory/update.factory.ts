import {
  DTO_Config_Interface,
  TypeOrmEntity_Config_Interface,
} from '../types/global';
import { Factory } from 'fishery';
import { createEntityTextFormatsCtx } from '../lib/createEntityTextFormatsCtx';
import { urlBuilderFactory } from './url-builder.factory';
import { routesGenericFactory } from './routes-builder.factory';
import { createFileSync } from '../commands/createFileSync.command';
import { Argument } from '../../rootDir/app/types/lib/config-types';

type EntityArgsDto = {
  create: DTO_Config_Interface;
};

type BackendArgs = {
  typeOrm?: TypeOrmEntity_Config_Interface;
};

type FrontEndArgs = {
  component: {
    list: ComponentAgiGridItem;
    item: ComponentAgiGridItem;
    form: ComponentFormItem;
  };
};

type EntityArgs = {
  name: string;
  dto: EntityArgsDto;
  backend: BackendArgs;
  frontEnd: FrontEndArgs;
};

export class DtoConfigFactory extends Factory<DTO_Config_Interface> {
  string(key: string) {
    return this.params({
      key: key,
      type: 'string',
      decorators: ['IsString'],
    });
  }

  generic({ key, decorators, type }: DTO_Config_Interface) {
    return this.params({
      key: key,
      type: 'string',
      decorators: decorators,
    });
  }

  Other(args: { type?: string; key: string; decorators: DtoDecorators[] }) {
    return this.params({
      key: args.key,
      type: 'string',
      decorators: ['IsString'],
    });
  }
}

export const dtoConfigFactory = DtoConfigFactory.define(() => ({}));

export class TypeORmConfigFactory extends Factory<TypeOrmEntity_Config_Interface> {
  string(key: string) {
    return this.params({
      key: key,
      type: 'string',
      decorators: ['Column'],
    });
  }

  generic({
    key,
    type,
    decorators,
  }: CreatePropertyOptional<TypeOrmEntity_Config_Interface, 'decorators'>) {
    return this.params({
      key: key,
      type: type,
      decorators: decorators ?? ['Column'],
    });
  }
}

export const typeOrmConfigFactory = TypeORmConfigFactory.define(() => ({}));

type ComponentAgiGridItem = {
  editable: boolean;
  field: string;
  component: string;
  type: string | [string, any];
};
type ComponentFormItem = {
  name: string;
  type: string | [string, any];
  value?: string;
  label?: string;
  description?: string;
  component?: string;
  props?: {
    statePath?: string;
    filter?: {
      key: string;
      operator: string; //TODO:Add operator types
      stateValuePath: string;
    };
    displayedValuePath?: string;
    selectedValuePath?: string;
    filterPath?: string;
  };
};

type ComponentAgiGridFieldItemArgs = {
  field: string;
  type: string | [string, any];
  editable?: boolean;
  cellEditor?: string;
  cellEditorParams?: string;
};

type ComponentAgiGridComponentItemArgs = {
  component: string;
  type: string | [string, any];
  args?: { [key: string]: any };
};

type ComponentAgiGridItemArgs =
  | ComponentAgiGridFieldItemArgs
  | ComponentAgiGridComponentItemArgs;

export class ComponentAgiGridItemFactory extends Factory<ComponentAgiGridItem> {
  string(args: { field: string; editable?: boolean }) {
    return this.params({
      field: args.field,
      editable: args.editable ?? false,
    });
  }

  generic(args: ComponentAgiGridItemArgs) {
    const type = resolveType(args.type);
    if (args['field']) {
      const obj = {
        field: args['field'],
        editable: args['editable'],
      };
      if (type === 'enum') {
        obj['type'] = 'enum';
        obj['valueSetter'] = [
          'reduxValueSetter2',
          {
            url: 'urls.mutateUrl',
            actionDispatcher: 'actions.updateAction',
            queryParam: 'urls.mutateQueryParam',
          },
        ];
        obj['cellEditor'] = 'agSelectCellEditor';
        obj['cellEditorParams'] = {
          values: `{{ENUM_${args.type[1]?.name}}}`,
        };
        obj['enum'] = {
          name: args.type[1]?.name,
          path: args.type[1]?.path,
        };
      }

      return this.params(obj);
    }
  }
}

export const componentAgiGridItemFactory = ComponentAgiGridItemFactory.define(
  () => ({}),
);

export function resolveType(value) {
  if (Array.isArray(value)) {
    // Type is an array and would be in the format ['type',{...args}]
    // i.e ['enum',{name:'ProductCategory',path:'../enums/email-category.enum.ts'
    const [type, args] = value;
    return type;
  }
  if (!Array.isArray(value)) {
    return value;
  }
}

export class ComponentFormItemFactory extends Factory<ComponentFormItem> {
  string(args: { name: string }) {
    return this.params({
      name: args.name,
      type: 'text',
    });
  }

  generic(args: ComponentFormItem) {
    const type = resolveType(args.type);
    const obj = {
      name: args.name,
      type: type,
    };
    if (type === 'enum') {
      obj['component'] = 'select';
      obj['props'] = {
        options: `{{ENUM_${args.type[1]?.name}}}`,
      };
      obj['enum'] = {
        name: args.type[1]?.name,
        path: args.type[1]?.path,
      };
    }
    if (args.value) {
      obj['value'] = args.value;
    }
    if (args.label) {
      obj['label'] = args.label;
    }
    if (args.description) {
      obj['description'] = args.description;
    }
    //TODO: refactor this ifs logic
    console.log('object->>', JSON.stringify(obj));

    return this.params(obj);
  }
}

export const componentFormItemFactory = ComponentFormItemFactory.define(
  () => ({}),
);
type AllOptionsEntityArgs = CreatePropertyOptional<
  EntityArgs,
  'dto' | 'frontEnd' | 'backend'
>;

export class EntityArgsItemFactory extends Factory<
  CreatePropertyOptional<EntityArgs, 'dto' | 'frontEnd' | 'backend'>
> {
  string(args: { name: string; editable?: boolean }) {
    return this.params({
      name: args.name,
      dto: {
        create: dtoConfigFactory.string(args.name).build(),
      },
      backend: {
        typeOrm: typeOrmConfigFactory.string(args.name).build(),
      },
      frontEnd: {
        component: {
          list: componentAgiGridItemFactory
            .string({
              field: args.name,
              editable: args.editable ?? false,
            })
            .build(),
          item: componentAgiGridItemFactory
            .string({
              field: args.name,
              editable: args.editable ?? false,
            })
            .build(),
          form: componentFormItemFactory.string({ name: args.name }).build(),
        },
      },
    });
  }

  ensemble<T = string>(args: {
    // for the moment being if you don't provide T when using Argument, it defaults to any. TODO: remove default
    name: Argument<T>;
    type: string;
    dto?: {
      create: CreatePropertyOptional<DTO_Config_Interface, 'key' | 'type'>;
    };
    backend?: {
      typeOrm?: CreatePropertyOptional<
        TypeOrmEntity_Config_Interface,
        'key' | 'type' | 'decorators' | 'isOptional'
      >;
    };
    frontEnd?: {
      editable?: boolean;
      component?: {
        list?: CreatePropertyOptional<
          ComponentAgiGridItem,
          'editable' | 'field' | 'type' | 'component'
        >;
        item?: CreatePropertyOptional<
          ComponentAgiGridItem,
          'editable' | 'field' | 'type' | 'component'
        >;

        form?: CreatePropertyOptional<ComponentFormItem, 'name' | 'type'>;
      };
    };
  }) {
    const obj = {
      name: args.name,
      type: args.type,
    };
    if (args.dto.create) {
      obj['dto'] = {};
      obj['dto']['create'] = dtoConfigFactory
        .generic({
          ...args.dto.create,
          key: args.dto.create.key ?? args.name,
          type: args.dto.create.type ?? args.type,
        })
        .build();
    }
    if (args.backend.typeOrm) {
      obj['backend'] = {};
      obj['backend']['typeOrm'] = typeOrmConfigFactory
        .generic({
          ...args.backend.typeOrm,
          key: args.backend.typeOrm.key ?? args.name,
          type: args.backend.typeOrm.type ?? args.type,
        })
        .build();
    }

    if (args.frontEnd) {
      obj['frontEnd'] = {};
      if (args.frontEnd.component) {
        obj['frontEnd']['component'] = {};
        if (args.frontEnd.component?.list) {
          obj['frontEnd']['component']['list'] = componentAgiGridItemFactory
            .generic({
              field: args.frontEnd.component.list.field ?? args.name,
              type: args.frontEnd.component.list.type ?? args.type,
              component: args.frontEnd.component.list.component ?? undefined,
              editable:
                args.frontEnd.component.list.editable ?? args.frontEnd.editable,
            })
            .build();
        }
        if (args.frontEnd.component?.item) {
          obj['frontEnd']['component']['item'] = componentAgiGridItemFactory
            .generic({
              field: args.frontEnd.component.item.field ?? args.name,
              type: args.frontEnd.component.list.type ?? args.type,
              editable:
                args.frontEnd.component.item.editable ?? args.frontEnd.editable,
            })
            .build();
        }
        if (args.frontEnd.component?.form) {
          obj['frontEnd']['component']['form'] = componentFormItemFactory
            .generic({
              name: args.frontEnd.component.form.name ?? args.name,
              type: args.frontEnd.component.form.type ?? args.type,
              value: args.frontEnd.component.form.value ?? null,
              label: args.frontEnd.component.form.label ?? null,
              description: args.frontEnd.component.form.description ?? null,
            })
            .build();
        }
      }
    }
    return this.params(obj);
  }
}

export const entityArgsFactory = EntityArgsItemFactory.define(() => ({}));

const x: AllOptionsEntityArgs = entityArgsFactory
  .string({ name: 'firstName', editable: false })
  .build();
// const y: AllOptionsEntityArgs = entityArgsFactory
//   .ensemble({
//     name: 'lastName',
//     type: 'string',
//     frontEnd: {
//       editable: true,
//       component: {
//         list: {},
//         item: {},
//         forms: {},
//       },
//     },
//     dto: {
//       create: {
//         decorators: ['IsString'],
//       },
//     },
//     backend: {
//       typeOrm: {},
//     },
//   })
//   .build();

// const z: EntityArgs = {
//   name: 'firstName',
//   dto: {
//     create: {
//       decorators: ['IsString'],
//       key: '{{PROPERTY_NAME}}',
//       type: 'string',
//     },
//   },
//   backend: {
//     typeOrm: {
//       decorators: ['Column'],
//       type: 'string',
//       key: '{{PROPERTY_NAME}}',
//     },
//   },
//   frontEnd: {
//     component: {
//       list: {
//         editable: true,
//         field: '{{PROPERTY_NAME}}',
//       },
//       item: {
//         editable: true,
//         field: '{{PROPERTY_NAME}}',
//       },
//       forms: {
//         name: '{{PROPERTY_NAME}}',
//         type: 'text',
//       },
//     },
//   },
// };

// const entityArgs = [x, y];

const buildArgsSchema = (entityArgs /*:AllOptionsEntityArgs[]*/) => {
  const components = {
    list: [],
    item: [],
    form: [],
  };
  const typeOrmProperties = [];

  const dto = {
    create: [],
  };
  entityArgs.forEach((arg: EntityArgs) => {
    if (arg.dto?.create) {
      dto.create.push(arg.dto.create);
    }
    if (arg.backend?.typeOrm) {
      typeOrmProperties.push(arg.backend.typeOrm);
    }
    if (arg.frontEnd?.component?.list) {
      components.list.push(arg.frontEnd.component.list);
    }
    if (arg.frontEnd?.component?.item) {
      components.item.push(arg.frontEnd.component.item);
    }
    if (arg.frontEnd?.component?.form) {
      components.form.push(arg.frontEnd.component.form);
    }
  });

  return { dto, typeOrmProperties, components };
};
//
// const entity1 = {
//   entity: 'invoice note',
//   entityPlural: 'invoice notes',
//   frontEnd: {
//     appNavigation: [
//       {
//         role: 'fullRole',
//         parent: 'AppNavigation', //TODO: this is a dependency
//         children: {
//           icon: 'CogIcon',
//           name: '{{PASCAL_CASE_ENTITY_PLURAL}}',
//           href: 'routes.0.path',
//           current: false,
//         },
//       },
//     ],
//     urlBuilder: {
//       relations: ['customer'], // TODO: if urlBuilder set at root then
//     },
//     routes: [],
//   },
//   backend: {
//     enums: [
//       {
//         name: 'AddressCategoryEnum',
//         values: ['Primary', 'Secondary'],
//       },
//     ],
//     typeOrm: {
//       entityClassDecorator: 'Entity',
//       sqlTable: '{{LOWERCASE_SNAKE_CASE_ENTITY_PLURAL}}',
//     },
//   },
//   arguments: [
//     entityArgsFactory.string({ name: 'firstName', editable: false }).build(),
//     entityArgsFactory
//       .ensemble({
//         name: 'lastName',
//         type: 'string',
//         frontEnd: {
//           editable: true,
//           component: {
//             list: {},
//             item: {},
//             forms: {},
//           },
//         },
//         dto: {
//           create: {
//             decorators: ['IsString'],
//           },
//         },
//         backend: {
//           typeOrm: {},
//         },
//       })
//       .build(),
//   ],
// };
// const entity2 = {
//   entity: 'user',
//   entityPlural: 'users',
//   frontEnd: {
//     appNavigation: [
//       {
//         role: 'fullRole',
//         parent: 'AppNavigation', //TODO: this is a dependency
//         children: {
//           icon: 'CogIcon',
//           name: '{{PASCAL_CASE_ENTITY_PLURAL}}',
//           href: 'routes.0.path',
//           current: false,
//         },
//       },
//     ],
//     urlBuilder: {
//       relations: ['customer'], // TODO: if urlBuilder set at root then
//     },
//     routes: [],
//   },
//   backend: {
//     enums: [
//       {
//         name: 'AddressCategoryEnum',
//         values: ['Primary', 'Secondary'],
//       },
//     ],
//     typeOrm: {
//       entityClassDecorator: 'Entity',
//       sqlTable: '{{LOWERCASE_SNAKE_CASE_ENTITY_PLURAL}}',
//     },
//   },
//   arguments: [
//     entityArgsFactory.string({ name: 'firstName', editable: false }).build(),
//     entityArgsFactory
//       .ensemble({
//         name: 'lastName',
//         type: 'string',
//         frontEnd: {
//           editable: true,
//           component: {
//             list: {},
//             item: {},
//             forms: {},
//           },
//         },
//         dto: {
//           create: {
//             decorators: ['IsString'],
//           },
//         },
//         backend: {
//           typeOrm: {},
//         },
//       })
//       .build(),
//   ],
// };

function processEntity(entity) {
  const entityNameFormats = createEntityTextFormatsCtx(
    entity.entity,
    entity.entityPlural,
  );

  const { typeOrmProperties, components, dto } = buildArgsSchema(
    /*entityArgs*/ null,
  );
  const backendResult = {
    entity: entityNameFormats.ORIGINAL_ENTITY,
    entityPlural: entityNameFormats.ORIGINAL_ENTITY_PLURAL,
    dto,
    enums: entity?.backend?.enums ?? [],
    typeOrm: {
      ...entity.backend.typeOrm,
      sqlTable: entityNameFormats.LOWER_SNAKE_CASE_ENTITY_PLURAL,
      properties: typeOrmProperties,
    },
  };
  const frontEndResult = {
    name: entityNameFormats.PASCAL_CASE_ENTITY_PLURAL,
    stateKey: entityNameFormats.CAMEL_CASE_ENTITY_PLURAL,
    appNavigation: entity.frontEnd.appNavigation,
    urlBuilder: urlBuilderFactory
      .generic({
        relations: entity.frontEnd.urlBuilder.relations,
        KEBAB_CASE_ENTITY_PLURAL: entityNameFormats.KEBAB_CASE_ENTITY_PLURAL,
      })
      .build(),
    routes: [
      ...routesGenericFactory.build({
        KEBAB_CASE_ENTITY_PLURAL: entityNameFormats.KEBAB_CASE_ENTITY_PLURAL,
        PASCAL_CASE_ENTITY: entityNameFormats.PASCAL_CASE_ENTITY,
        PASCAL_CASE_ENTITY_PLURAL: entityNameFormats.PASCAL_CASE_ENTITY_PLURAL,
      }),
      ...entity.frontEnd.routes,
    ],
    colDef: {
      list: components.list,
      item: components.item,
    },
    form: {
      create: components.form,
    },
  };
  // console.log(JSON.stringify(backendResult, null, 2));
  const front = JSON.stringify(frontEndResult, null, 2);

  const back = JSON.stringify(backendResult, null, 2);
  const frontPath = `./delete-me/frontend/${entityNameFormats.KEBAB_CASE_ENTITY_PLURAL}.json`;
  const backPath = `./delete-me/backend/${entityNameFormats.KEBAB_CASE_ENTITY_PLURAL}.json`;

  createFileSync({
    filePath: frontPath,
    forceCreation: true,
    content: front,
  });
  createFileSync({
    filePath: backPath,
    forceCreation: true,
    content: back,
  });
  const frontStr = `import ${entityNameFormats.CAMEL_CASE_ENTITY_PLURAL} from './${entityNameFormats.KEBAB_CASE_ENTITY_PLURAL}'`;
  return frontStr;
}

function createSystemInputs(entities) {
  entities.forEach((entity) => processEntity(entity));
  const imports = entities.map((entity) => {
    const entityNameFormats = createEntityTextFormatsCtx(
      entity.entity,
      entity.entityPlural,
    );
    return `import ${entityNameFormats.CAMEL_CASE_ENTITY_PLURAL} from './${entityNameFormats.KEBAB_CASE_ENTITY_PLURAL}.json'`;
  });
  const arrItems = entities.map((entity) => {
    const entityNameFormats = createEntityTextFormatsCtx(
      entity.entity,
      entity.entityPlural,
    );
    return entityNameFormats.CAMEL_CASE_ENTITY_PLURAL;
  });

  const str = `${imports.join('\n')}
    export default{
        systemInputs:[${arrItems.join(',')}]
    }`;

  createFileSync({
    filePath: `./delete-me/frontend/index.ts`,
    forceCreation: true,
    content: str,
  });
  createFileSync({
    filePath: `./delete-me/backend/index.ts`,
    forceCreation: true,
    content: str,
  });
}

// const entities = [entity1, entity2]
//
// createSystemInputs(entities)
