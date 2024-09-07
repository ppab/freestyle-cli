import { entityArgsFactory } from '../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'interior',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'interior',
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
        decorators: ['Column'],
        key: 'interior',
        isOptional: false,
        type: 'string',
      },
    },
  })
  .build();
