import { listFromStatePathFieldFactory } from './list-from-state-path-field-component.factory';

describe('listFromStateApiFieldComponent', () => {
  describe('generic()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          name: 'name',
          value: 'name',
          label: 'name',
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

        listFromStatePathFieldFactory
          .generic({
            name: 'name',
            label: 'name',
            value: 'name',
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
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });

    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          name: 'name',
          value: 'name',
          label: 'name',
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
        listFromStatePathFieldFactory
          .generic({
            name: 'name',
            label: 'name',
            value: 'name',
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
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
  });
});
