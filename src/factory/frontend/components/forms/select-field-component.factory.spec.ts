import { selectFieldComponentFactory } from './select-field-component.factory';

describe('selectComponent', () => {
  describe('generic()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          type: 'text',
          name: 'name',
          value: 'name',
          label: 'name',
          component: 'select',
          props: {
            options: ['test'],
          },
        },

        selectFieldComponentFactory
          .generic({
            type: 'text',
            name: 'name',
            value: 'name',
            label: 'name',
            props: {
              options: ['test'],
            },
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          type: 'text',
          name: 'name',
          value: 'name',
          label: 'name',
          component: 'select',
          props: {
            options: ['test'],
          },
        },

        selectFieldComponentFactory
          .generic({
            type: 'text',
            name: 'name',
            props: {
              options: ['test'],
            },
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
  });
  describe('number()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          type: 'number',
          name: 'name',
          value: 'name',
          label: 'name',
          component: 'select',
          props: {
            options: ['test'],
          },
        },

        selectFieldComponentFactory
          .number({
            name: 'name',
            props: {
              options: ['test'],
            },
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          type: 'number',
          name: 'name',
          value: 'name2',
          label: 'name2',
          component: 'select',
          props: {
            options: ['test'],
          },
        },

        selectFieldComponentFactory
          .number({
            name: 'name',
            value: 'name2',
            label: 'name2',
            props: {
              options: ['test'],
            },
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
  });
  describe('string()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          type: 'text',
          name: 'name',
          value: 'name',
          label: 'name',
          component: 'select',
          props: {
            options: ['test'],
          },
        },

        selectFieldComponentFactory
          .string({
            name: 'name',
            props: {
              options: ['test'],
            },
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          type: 'text',
          name: 'name',
          value: 'name2',
          label: 'name2',
          component: 'select',
          props: {
            options: ['test'],
          },
        },

        selectFieldComponentFactory
          .string({
            name: 'name',
            value: 'name2',
            label: 'name2',
            props: {
              options: ['test'],
            },
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
  });
});
