import { entityArguments } from './args';

export default {
  entity: 'address',
  entityPlural: 'addresses',
  arguments: entityArguments,
  rootDir: './rootDir/dist/',
  enums: [],
  dto: [
    {
      name: 'create',
      values: [],
      paths: [
        './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/dto/create-dto.ts',
        // './rootDir/dist/backend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/dto/create-{{KEBAB_CASE_ENTITY_PLURAL}}.dto.ts',
      ],
    },
  ],
  frontEnd: {
    rootDir: 'frontend/',
    appNavigation: [
      {
        role: 'fullRole',
        parent: 'AppNavigation', //TODO: this is a dependency
        children: {
          icon: 'CogIcon',
          name: '{{PASCAL_CASE_ENTITY_PLURAL}}',
          href: 'routes.0.path',
          current: false,
        },
      },
    ],
    urlBuilder: {
      relations: [],
    },
    routes: [],
    components: {
      list: {
        // Declaring Template type will
        template: 'Standard',
        colDefinitions: [
          // Add Components to The colDefinitions such as: LinkButton
          {
            component: 'LinkButton',
            args: {},
          },
          'COL_DEFS_ARR',
          // Add Components to The colDefinitions such as: DeleteButton
          {
            component: 'DeleteButton',
          },
        ],
      },
      forms: {
        create: {
          dto: {
            name: 'CreateaddressDto',
            path: './dto/create-address.dto',
          },
          enums: [],
          formElements: [],
        },
      },
    },
  },
  backend: {
    rootDir: 'backend/',
    typeOrm: {
      entityClassDecorator: 'Entity',
      sqlTable: '{{LOWERCASE_SNAKE_CASE_ENTITY_PLURAL}}',
    },
  },
};
