import { Factory } from 'fishery';

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

export class ListFromStateAPIFieldFactory extends Factory<ListFieldFromStatePath> {
  generic({
    name,
    value,
    label,
    props,
  }: RequireOnly<ListFieldFromStatePath, 'name' | 'props'>) {
    return this.params({
      name,
      value: value ?? name,
      label: label ?? name,
      component: 'ListFieldFromStatePath',
      props,
    });
  }
}

export const listFromStatePathFieldFactory =
  ListFromStateAPIFieldFactory.define(() => ({}));
