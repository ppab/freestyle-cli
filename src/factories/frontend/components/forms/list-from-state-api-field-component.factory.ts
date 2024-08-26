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

type ListFromStateAPIFieldUrlResolverPartsProps = {
  parts: string | ['statePath' | 'dependency'];
};
type ListFromStateAPIFieldUrlResolverDependenciesProps = {
  dependencies: ['params.*' | 'appSate.*'];
};

type ListFromStateAPIFieldUrlResolverProps = {
  dependencies?: ['params.*' | 'appSate.*'];
  parts?: ListFromStateAPIFieldUrlResolverPartsProps;
};

type ListFromStateAPIFieldDataResolverProps = {
  displayedValue?: {
    path: string;
    parts: string;
  };
  filterPath: string;
};

type ListFromStateAPIFieldProps = {
  url: string;
  modelName: string; //This model name should only come from the return type of the store keys
  urlResolver: ListFromStateAPIFieldUrlResolverProps;
  dataResolver: ListFromStateAPIFieldDataResolverProps;
};

type ListFromStateAPIField = {
  name: string;
  value: string;
  label: string;
  component: 'ListFieldFromStateAPI';
  props: ListFromStateAPIFieldProps;
  displayedValuePath: string;
  displayValueParts?: string;
  selectedValuePath: string;
  filterPath: string;
};

export class ListFromStateAPIFieldFactory extends Factory<ListFromStateAPIField> {
  generic({
    name,
    value,
    label,
  }: RequireOnly<ListFromStateAPIField, 'name' | 'value'|'component'|'props') {
    return this.params({
      name,
      value: value ?? name,
      label: label ?? name,
      component: 'ListFieldFromStateAPI',
    });
  }
}

export const inputFieldComponentFactory = InputFieldComponentFactory.define(
  () => ({}),
);
