import { Factory } from 'fishery';

type SelectField = {
  type: string;
  name: string;
  value: string;
  label: string;
  component: 'select';
  props: SelectFieldProps;
};

type SelectFieldProps = {
  options: string[];
};

export class SelectFieldComponentFactory extends Factory<SelectField> {
  string({
    name,
    value,
    label,
    props,
  }: {
    name: string;
    value?: string;
    label?: string;
    props: SelectFieldProps;
  }) {
    return this.generic({
      type: 'text',
      name,
      value,
      label,
      props,
    });
  }

  number({
    name,
    value,
    label,
    props,
  }: {
    name: string;
    value?: string;
    label?: string;
    props: SelectFieldProps;
  }) {
    return this.generic({
      type: 'number',
      name,
      value,
      label,
      props,
    });
  }

  generic({
    type,
    name,
    value,
    label,
    props,
  }: RequireOnly<SelectField, 'type' | 'name' | 'props'>) {
    return this.params({
      type,
      name,
      value: value ?? name,
      label: label ?? name,
      component: 'select', //TODO: Refactor this name
      props,
    });
  }
}

export const selectFieldComponentFactory = SelectFieldComponentFactory.define(
  () => ({}),
);
