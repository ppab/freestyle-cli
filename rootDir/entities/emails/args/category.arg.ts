import { entityArgsFactory } from '../../../../src/factories/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'category',
    type: 'string',
    dto: {
      create: {
        decorators: ['IsEnum'],
      },
    },
    // ['enum', {name: 'EmailCategory', path: '../enums/address-category.enums'}],
    frontEnd: {
      component: {
        list: {
          field: 'category',
          editable: true,
          type: [
            'enum',
            { name: 'EmailCategory', path: '../enums/email-category.enum' },
          ],
        },
        item: {
          field: 'category',
          editable: true,
          type: [
            'enum',
            { name: 'EmailCategory', path: '../enums/email-category.enum' },
          ],
        },
        form: {
          type: [
            'enum',
            { name: 'EmailCategory', path: '../enums/email-category.enum' },
          ],
          name: 'category',
          value: 'category',
          label: 'categoria correo',
          description: 'this is a description',
        },
      },
    },
    //     {
    //     editable: true,
    //     component: {
    //         list: {},
    //         item: {},
    //         forms: {
    //             imports:{
    //                 args: 'EmailCategory',
    //                 path: '../enums/address-category.enums',
    //             },
    //             item:{
    //                 type: 'enum',
    //                 value: 'category',
    //                 label: 'categoria',
    //                 component: 'select',
    //                 // props: {
    //                 //     options: EmailCategory
    //                 // }
    //                 // description: "this is a description"
    //             }
    //
    //         },
    //     }
    // },

    backend: {
      typeOrm: {},
    },
  })
  .build();
