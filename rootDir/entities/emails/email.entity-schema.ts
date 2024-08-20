import { entityArguments } from './args';
import { routesFactory } from '../../../src/factories/routes-builder.factory';

export default {
  entity: 'email',
  entityPlural: 'emails',
  arguments: entityArguments,
  rootDir: './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/',
  enums: [
    {
      name: 'EmailCategory',
      values: ['Primary', 'Secondary'],
      paths: [
        './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/enums/email-category.enum.ts',
        './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/backend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/enums/email-category.enum.ts',
      ],
    },
  ],
  dto: [
    {
      name: 'create',
      values: [],
      paths: [
        './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/dto/create-dto.ts',
        './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/backend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/dto/create-{{KEBAB_CASE_ENTITY_PLURAL}}.dto.ts',
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
      relations: ['test-relation', 'test'],
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
              name: 'EmailCategory',
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
