import { entityArguments } from './args';
import { routesFactory } from '../../../../src/factory/routes-builder.factory';

export default {
  entity: 'email',
  entityPlural: 'emails',
  arguments: entityArguments,
  rootDir: './rootDir/dist/',
  enums: [
    {
      name: 'EmailCategory',
      values: ['Primary', 'Secondary'],
      paths: [
        './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/enums/email-category.enum.ts',
        './rootDir/dist/backend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/enums/email-category.enum.ts',
      ],
    },
  ],
  dto: [
    {
      name: 'create',
      values: [],
      paths: [
        './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/dto/create.dto.config.md',
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
