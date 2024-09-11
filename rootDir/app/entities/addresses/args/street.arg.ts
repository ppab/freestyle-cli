import { entityArgsFactory } from '../../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'street',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'street',
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
        key: 'street',
        isOptional: false,
        type: 'string',
      },
    },
  })
  .build();
