import { Factory } from 'fishery';

type InputFieldComponent = {
  type: 'text' | 'number';
  name: string;
  value: string;
  label: string;
  component: 'InputField';
};

type SelectField = {
  type: string;
  name: string;
  value: string;
  label: string;
  component: 'select';
  props: {
    options: string[];
  };
};
type ListFieldFromStatePath = {
  name: string;
  value: string;
  label: string;
  component: 'ListFieldFromStatePath';
  props: {
    statePath: string;
    filter: {
      key: string;
      operator: string;
      stateValuePath: string;
    };
    displayedValuePath: string;
    selectedValuePath: string;
    filterPath: string;
  };
};

export class InputFieldComponentFactory extends Factory<InputFieldComponent> {
  string({
    name,
    value,
    label,
  }: {
    name: string;
    value?: string;
    label?: string;
  }) {
    return this.generic({
      type: 'text',
      name,
      value,
      label,
    });
  }

  number({
    name,
    value,
    label,
  }: {
    name: string;
    value?: string;
    label?: string;
  }) {
    return this.generic({
      type: 'number',
      name,
      value,
      label,
    });
  }

  generic({
    type,
    name,
    value,
    label,
  }: RequireOnly<InputFieldComponent, 'type' | 'name'>) {
    return this.params({
      type,
      name,
      value: value ?? name,
      label: label ?? name,
      component: 'InputField',
    });
  }
}

export const inputFieldComponentFactory = InputFieldComponentFactory.define(
  () => ({}),
);
