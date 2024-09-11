import { entityArgsFactory } from '../../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'state',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'state',
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
        key: 'state',
        isOptional: false,
        type: 'string',
      },
    },
  })
  .build();
