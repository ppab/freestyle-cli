import { formComponents } from 'ppab-ts-lib';

describe('FormComponents', () => {
  it('renders correctly', () => {
    const subject = formComponents.factory.inputFieldComponentFactory
      .string({
        name: 'name',
      })
      .build();

    const expectation = {
      name: 'name',
      label: 'names',
      value: 'name',
      type: 'text',
      component: 'InputField',
    };

    expect(subject).toEqual(expectation);
  });
});
