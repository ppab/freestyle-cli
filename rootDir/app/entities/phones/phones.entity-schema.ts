import { entityArguments } from './args';

export default {
  entity: 'phone',
  entityPlural: 'phones',
  arguments: entityArguments,
  rootDir: './rootDir/dist/',
  enums: [
    {
      name: 'PhoneCategory',
      values: ['Mobile', 'Office'],
      paths: [
        './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/enums/phone-category.enum.ts',
        './rootDir/dist/backend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/enums/phone-category.enum.ts',
      ],
    },
  ],
  dto: [
    {
      name: 'create',
      values: [],
      paths: [
        './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/dto/create-dto.ts',
        './rootDir/dist/backend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/dto/create-{{KEBAB_CASE_ENTITY_PLURAL}}.dto.ts',
      ],
    },
  ],
  frontEnd: {
    rootDir: 'frontend/',
    appNavigation: [
      {
        role: 'fullRole',
        parent: 'Catalog', //TODO: this is a dependency
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
            name: 'CreateEmailDto',
            path: './dto/create-email.dto',
          },
          enums: [
            {
              name: 'ProductCategory',
              path: './enums/email-category.enum',
            },
          ],
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
