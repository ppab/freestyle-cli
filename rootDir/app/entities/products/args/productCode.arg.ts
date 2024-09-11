import { entityArgsFactory } from '../../../../../src/factory/update.factory';

export default entityArgsFactory
  .ensemble({
    name: 'productCode',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'productCode',
              type: 'string',
              editable: true,
            },
          ],
        ],
        form: {
          //TODO: Define Custom component with ->
          // generateProductCode FN->()
          /*
           * //unique//->//Como se genera,
           * El primer caracter de las 2 palabras  (2 iniciales), *****Lechuga Romana->LE
           * si es una palabra los primeros dos caracteres, ******Brocoli->Br
           *  sí ya existe ese productCode tendríamos que mostrar el error para que el usuario de de alta el código
           * generate request to server to identify if name exisit, if it does, show the product name that was found with that  code
           * */
          //TODO: Ver el curso donde se crea el componente que espera unos segundos a que la form termine el input y después se hace una accion.
          //
        },
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
        key: 'productCode',
        isOptional: false,
        type: 'string',
      },
    },
  })
  .build();
