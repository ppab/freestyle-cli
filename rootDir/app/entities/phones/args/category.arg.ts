import { entityArgsFactory } from '../../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'category',
    type: 'string',
    dto: {
      create: {
        decorators: [
          'IsString',
          [
            'IsEnum',
            {
              args: 'PhoneCategory',
              path: '../enums/phone-category.enum',
            },
          ],
        ],
      },
    },
    frontEnd: {
      component: {
        list: {
          field: 'category',
          editable: true,
          type: [
            'enum',
            { name: 'PhoneCategory', path: '../enums/phone-category.enum' },
          ],
        },
        item: [
          [
            {
              field: 'category',
              editable: true,
              type: [
                'enum',
                { name: 'PhoneCategory', path: '../enums/phone-category.enum' },
              ],
            },
          ],
        ],
        form: {
          type: [
            'enum',
            { name: 'PhoneCategory', path: '../enums/phone-category.enum' },
          ],
          name: 'category',
          value: 'category',
          label: 'Categoria teléfono',
          description: 'this is a description',
        },
      },
    },
    backend: {
      typeOrm: {
        decorators: [['Column', { args: { nullable: true } }]],
        key: 'category',
        isOptional: true,
        type: 'string',
      },
    },
  })
  .build();
