import { entityArgsFactory } from '../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'number',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'number',
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
        key: 'number',
        isOptional: false,
        type: 'string',
      },
    },
  })
  .build();
