import { entityArgsFactory } from '../../../../../src/factory/update.factory';
import { ICarrier } from '../../../types/interfaces/commercial-entity/carrier/carrier.interface';

export default entityArgsFactory
  .ensemble<ICarrier>({
    name: 'category',
    type: 'string',
    frontEnd: {
      editable: true,
      component: {
        list: {},
        item: [
          [
            {
              field: 'contactI2',
              type: 'string',
              editable: false,
            },
          ],
        ],
        form: {
          name: 'contactId',
          value: 'contactId',
          label: 'contact',
          component: 'ListFieldFromStatePath',
          props: {
            statePath: 'products.data',
            filter: {
              key: 'id',
              operator: 'StringEquals',
              stateValuePath: 'products.selected.id',
            },
            displayedValuePath: 'productCategory',
            selectedValuePath: 'id',
            filterPath: 'name',

            // http://localhost:3002/contacts?filters=commercialEntityId:20927e1d-71fe-4245-bab3-555501d7ed22
          },
        },
      },
    },
    dto: {
      create: {
        decorators: [
          ['ValidateNested', { args: '{each:true}' }],
          [
            'Type',
            {
              args: 'CreateContactDto',
              path: '../../contacts/dto/create-contact.dto',
            },
          ],
        ],
        key: 'contacts',
        type: 'CreateContactDto',
      },
    },
    backend: {
      typeOrm: {
        decorators: [['Column', { args: { nullable: true } }]],
        key: 'contactId',
        isOptional: false,
        type: 'string',
      },
    },
  })
  .build();
