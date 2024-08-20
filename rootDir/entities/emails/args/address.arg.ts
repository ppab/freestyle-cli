import { entityArgsFactory } from '../../../../src/factories/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'address',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'address',
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
        decorators: ['IsEmail', 'IsString'],
      },
    },
    backend: {
      typeOrm: {
        decorators: [['Column', { args: { nullable: true } }]],
        key: 'address',
        isOptional: true,
        type: 'string',
      },
    },
  })
  .build();
