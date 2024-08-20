import { entityArgsFactory } from '../../../../src/factories/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'address',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: {},
        form: {},
      },
    },
    dto: {
      create: {
        decorators: ['IsEmail', 'IsString'],
      },
    },
    backend: {
      typeOrm: {},
    },
  })
  .build();
