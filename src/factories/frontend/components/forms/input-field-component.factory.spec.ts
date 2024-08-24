import { inputFieldComponentFactory } from './input-field-component.factory';

describe('inputFieldComponent', () => {
  describe('generic()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          type: 'text',
          name: 'name',
          value: 'name',
          label: 'name',
          component: 'InputField',
        },

        inputFieldComponentFactory
          .generic({
            type: 'text',
            name: 'name',
            value: 'name',
            label: 'name',
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
          component: 'InputField',
        },

        inputFieldComponentFactory
          .generic({
            type: 'text',
            name: 'name',
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
          component: 'InputField',
        },

        inputFieldComponentFactory
          .number({
            name: 'name',
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
          component: 'InputField',
        },

        inputFieldComponentFactory
          .number({
            name: 'name',
            value: 'name2',
            label: 'name2',
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
          component: 'InputField',
        },

        inputFieldComponentFactory
          .string({
            name: 'name',
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
          component: 'InputField',
        },

        inputFieldComponentFactory
          .string({
            name: 'name',
            value: 'name2',
            label: 'name2',
          })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
  });
});
