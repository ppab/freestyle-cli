import { appNavigation } from './app-navigation';
import { urlBuilder } from './url-builder';

export default {
  rootDir: 'frontend/',
  appNavigation,
  urlBuilder,
  routes: [],
  components: {
    list: {
      // Declaring Template type will
      template: 'Standard',
      colDefinitions: [
        // Add Components to The colDefinitions such as: LinkButton
        {
          component: 'LinkButton',
          args: {},
        },
        'COL_DEFS_ARR',
        // Add Components to The colDefinitions such as: DeleteButton
        {
          component: 'DeleteButton',
        },
      ],
    },
    forms: {
      create: {
        dto: {
          name: 'CreateaddressDto',
          path: './dto/create-address.dto',
        },
        enums: [],
        formElements: [],
      },
    },
  },
};
