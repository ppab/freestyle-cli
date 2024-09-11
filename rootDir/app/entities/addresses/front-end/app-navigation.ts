export const appNavigation = [
  {
    role: 'fullRole',
    parent: 'AppNavigation', //TODO: this is a dependency
    children: {
      icon: 'CogIcon',
      name: '{{PASCAL_CASE_ENTITY_PLURAL}}',
      href: 'routes.0.path',
      current: false,
    },
  },
];
