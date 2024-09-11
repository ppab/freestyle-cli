import { entityArgsFactory } from '../../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'taxRegime',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'taxRegime',
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
        key: 'taxRegime',
        isOptional: false,
        type: 'string',
      },
    },
  })
  .build();
