import { entityArgsFactory } from '../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'taxId',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'taxId',
              type: 'string',
              editable: false,
            },
          ],
        ],
        form: {},
      },
    },
    dto: {
      create: {
        decorators: ['IsString'],
      },
    },
    backend: {
      typeOrm: {
        decorators: [['Column', { args: { nullable: true } }]],
        key: 'taxId',
        isOptional: false,
        type: 'string',
      },
    },
  })
  .build();
