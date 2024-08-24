import { Factory } from 'fishery';

type InputField = {
  type: string;
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

export class FormItemFactory extends Factory<any> {
  inputField() {}

  select() {}

  listFieldFromStatePath() {}

  listFieldFromStateApi() {}
}

export const typeOrmKeyFactory = FormItemFactory.define(() => ({}));
