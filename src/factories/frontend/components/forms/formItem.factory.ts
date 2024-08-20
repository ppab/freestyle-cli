type FormItemFactoryArgs = {
  name: string;
  type: string;
  component?: string;
  props?: { [key: string]: any };
};
export const formItemFactory = ({
  name,
  type,
  component = 'InputField',
  props,
}: FormItemFactoryArgs) => {
  return {
    name,
    type,
    value: name,
    label: name,
    component,
    props,
  };
};
