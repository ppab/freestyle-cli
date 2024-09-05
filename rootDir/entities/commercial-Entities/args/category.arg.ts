import { entityArgsFactory } from '../../../../src/factory/update.factory';

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
              args: 'CommercialEntityCategory',
              path: '../enums/email-category.enum',
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
            {
              name: 'CommercialEntityCategory',
              path: '../enums/commercial-entity.enum',
            },
          ],
        },
        item: [
          [
            {
              field: 'category',
              editable: true,
              type: [
                'enum',
                {
                  name: 'CommercialEntityCategory',
                  path: '../enums/commercial-entity.enum',
                },
              ],
            },
          ],
        ],
        form: {
          type: [
            'enum',
            {
              name: 'CommercialEntityCategory',
              path: '../enums/commercial-entity.enum',
            },
          ],
          name: 'category',
          value: 'category',
          label: 'categoria correo',
          description: 'this is a description',
        },
      },
    },
    backend: {
      typeOrm: {
        //TODO: verify that we can create Enums
        // @Column({ enum: AddressCategory })
        // category: AddressCategory;

        key: 'category',
        isOptional: false,
        type: 'CommercialEntityCategory',
        decorators: [
          [
            'Column',
            {
              args: {
                enum: {
                  name: 'CommercialEntityCategory',
                  path: '../../commercial-entities/enums/commercial-entity-category.enum',
                },
              },
            },
          ],
        ],
      },
    },
  })
  .build();
