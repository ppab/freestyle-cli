import { entityArgsFactory } from '../../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'folio',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'name',
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
        key: 'name',
        isOptional: true,
        type: 'string',
      },
    },
  })
  .build();
