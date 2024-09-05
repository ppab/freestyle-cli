import { listFromStateAPIFieldFactory } from './list-from-state-api-field-component.factory';

describe('listFromStateApiFieldComponent', () => {
  describe('generic()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          name: 'name',
          value: 'name',
          label: 'name',
          component: 'ListFieldFromStateAPI',
          props: {
            url: 'http://test.com',
            modelName: 'modelName',
            urlResolver: {
              dependencies: ['params', 'appState'],
              parts: ['statePath'],
            },
            dataResolver: {
              filterPath: 'name',
              displayedValue: {
                path: 'myPath',
                parts: ['statePath'],
              },
              selectedValuePath: 'id',
            },
          },
        },

        listFromStateAPIFieldFactory
          .generic({
            name: 'name',
            label: 'name',
            value: 'name',
            props: {
              url: 'http://test.com',
              modelName: 'modelName',
              urlResolver: {
                dependencies: ['params', 'appState'],
                parts: ['statePath'],
              },
              dataResolver: {
                filterPath: 'name',
                displayedValue: {
                  path: 'myPath',
                  parts: ['statePath'],
                },
                selectedValuePath: 'id',
              },
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
          component: 'ListFieldFromStateAPI',
          props: {
            url: 'http://test.com',
            modelName: 'modelName',
            urlResolver: {
              dependencies: ['params', 'appState'],
              parts: ['statePath'],
            },
            dataResolver: {
              filterPath: 'name',
              displayedValue: {
                path: 'myPath',
                parts: ['statePath'],
              },
              selectedValuePath: 'id',
            },
          },
        },
        listFromStateAPIFieldFactory
          .generic({
            name: 'name',
            label: 'name',
            value: 'name',
            props: {
              url: 'http://test.com',
              modelName: 'modelName',
              urlResolver: {
                dependencies: ['params', 'appState'],
                parts: ['statePath'],
              },
              dataResolver: {
                filterPath: 'name',
                displayedValue: {
                  path: 'myPath',
                  parts: ['statePath'],
                },
                selectedValuePath: 'id',
              },
            },
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
  });
});
