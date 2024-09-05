import { Factory } from 'fishery';
import { UrlBuilderQueryParameters } from '../../../../types/global';

type UrlResolverDependenciesScope = 'appState' | 'params' | 'apiPath';
type ListFromStateAPIFieldUrlResolverProps = {
  /*
   * dependencies?: this field is used to declare the scope of the contexts that need to be loaded in order to resolve the url.
   * our current scopes are
   * */
  dependencies: UrlResolverDependenciesScope[]; //from redux store //TODO verify string start with null or : ['params.*' | 'appSate.*'];
  parts?: string | ['statePath' | 'dependency']; // TODO: verify type
  queryParameters?: UrlBuilderQueryParameters;
};

type ListFromStateAPIFieldDataResolverProps = {
  displayedValue?: {
    path: string;
    parts: string[]; //When you want to display multiple properties of an abject as join string: I.E  ['address.street', 'address.number', 'address.zip', 'address.state'],
  };
  filterPath: string; // 'id', 'user.name'
  selectedValuePath: string;
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
  displayedValuePath?: string;
  displayValueParts?: string;
  selectedValuePath?: string;
  filterPath?: string;
};

export class ListFromStateAPIFieldFactory extends Factory<ListFromStateAPIField> {
  generic({
    name,
    value,
    label,
    props,
  }: RequireOnly<ListFromStateAPIField, 'name' | 'props'>) {
    return this.params({
      name,
      value: value ?? name,
      label: label ?? name,
      component: 'ListFieldFromStateAPI',
      props,
    });
  }
}

export const listFromStateAPIFieldFactory = ListFromStateAPIFieldFactory.define(
  () => ({}),
);
