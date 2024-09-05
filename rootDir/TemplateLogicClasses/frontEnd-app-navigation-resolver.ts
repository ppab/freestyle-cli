import { ResolverBaseClass } from './resolver-base-class';

export class FrontEndAppNavigationResolver extends ResolverBaseClass {
  contentDestinationTemplateString: string = `
  export const appNavigation = [
    {
        role: 'fullRole',
        createParent: '{{PASCAL_CASE_ENTITY_PLURAL}}',
        children: {
            icon: 'CogIcon',
            name: '{{PASCAL_CASE_ENTITY_PLURAL}}',
            href: 'routes.0.path',
            current: false,
        },
    }
  ]
`;
  contentDestinationPath: string =
    './rootDir/dist/frontend/modules/{{KEBAB_CASE_ENTITY_PLURAL}}/app-navigation.ts';

  public execute() {
    this.addEntityFormatsToCtx();
    this.createFile();
  }

  static create(entityName: { singular: string; plural: string }) {
    const resolver = new FrontEndAppNavigationResolver();
    resolver.setEntity(entityName);
    resolver.execute();
  }
}
