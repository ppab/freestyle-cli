import { entityArgsFactory } from '../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'customFields',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'customFields',
              type: 'string',
              editable: false,
            },
          ],
        ],
        form: {}, //TODO: Handle the case where no form is defined, if so we would´t create a frontendComponent
      },
    },
    dto: {
      create: {
        decorators: ['IsOptional', 'IsObject'],
        key: 'customFields',
        type: 'Record<string, any>',
      },
    },
    backend: {
      typeOrm: {
        decorators: [['Column', { args: { type: 'jsonb', nullable: true } }]],
        key: 'customFields',
        isOptional: true,
        type: 'Record<string, any>',
      },
    },
  })
  .build();
