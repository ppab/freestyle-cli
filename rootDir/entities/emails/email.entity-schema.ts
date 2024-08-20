import { entityArguments } from './args';
import { routesFactory } from '../../../src/factories/routes-builder.factory';

export default {
  entity: 'email',
  entityPlural: 'emails',
  arguments: entityArguments,
  enums: [
    {
      name: 'EmailCategory',
      values: ['Primary', 'Secondary'],
      paths: [
        './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/frontend/{{KEBAB_CASE_ENTITY_PLURAL}}/enums/email-category.enum.ts',
        './rootDir/dist/{{KEBAB_CASE_ENTITY_PLURAL}}Module/backend/{{KEBAB_CASE_ENTITY_PLURAL}}/enums/email-category.enum.ts',
      ],
    },
  ],
  frontEnd: {
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
      relations: [''],
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
    typeOrm: {
      entityClassDecorator: 'Entity',
      sqlTable: '{{LOWERCASE_SNAKE_CASE_ENTITY_PLURAL}}',
    },
  },
};
