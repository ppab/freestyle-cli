import { entityArgsFactory } from '../../../../src/factories/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'description',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'description',
              type: 'string',
              editable: true,
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
        key: 'description',
        isOptional: false,
        type: 'string',
      },
    },
  })
  .build();
