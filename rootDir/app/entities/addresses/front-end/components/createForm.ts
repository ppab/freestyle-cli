import { formComponents } from 'ppab-ts-lib';
import { AddressCategoryEnum } from '../../../../types/enums/address-category.enum';

export default {
  items: [
    formComponents.factory.selectFieldComponentFactory
      .string({
        name: 'category',
        props: {
          options: Object.keys(AddressCategoryEnum),
        },
      })
      .build(),
    formComponents.factory.inputFieldComponentFactory
      .string({
        name: 'number',
      })
      .build(),
    formComponents.factory.inputFieldComponentFactory
      .string({
        name: 'street',
      })
      .build(),
    formComponents.factory.inputFieldComponentFactory
      .string({
        name: 'interior',
      })
      .build(),
    formComponents.factory.inputFieldComponentFactory
      .string({
        name: 'zip',
      })
      .build(),
    formComponents.factory.inputFieldComponentFactory
      .string({
        name: 'city',
      })
      .build(),
    formComponents.factory.inputFieldComponentFactory
      .string({
        name: 'state',
      })
      .build(),
    formComponents.factory.inputFieldComponentFactory
      .string({
        name: 'country',
      })
      .build(),
  ],
};
