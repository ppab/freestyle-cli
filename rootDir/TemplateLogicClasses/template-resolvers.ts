import { BackendSystemInputListResolver } from './backend-system-input-list-resolver';
import { FrontendAppModuleListResolver } from './frontend-app-module-list-resolver';
import { FrontendStoreListResolver } from './frontend-store-list-resolver';
import { FrontEndIndexResolver } from './frontEnd-index-resolver';
import { FrontEndPagesResolver } from './frontEnd-pages-resolver';
import { FrontEndComponentsResolver } from './frontEnd-Components-resolver';
import { FrontEndEntityComponentResolver } from './frontEnd-entity-component-resolver';
import { FrontEndUrlBuilderResolver } from './frontEnd-urlBuilder-resolver';
import { FrontEndRoutesResolver } from './frontEnd-routes-resolver';
import { FrontEndModuleResolver } from './frontEnd-module-resolver';
import { FrontEndEntitySliceResolver } from './frontEnd-entity-slice-resolver';
import { EnumResolver } from './enum-resolver';
import { FormComponentResolver } from './form-component-resolver';
import { ListColDefResolver } from './list-col-def-resolver';
import { ItemColDefResolver } from './item-col-def-resolver';
import { BackendSystemInputResolver } from './backend-system-input-resolver';
import { DtoResolver } from './dto-resolver';
import { EntitySchema } from './resolver-base-class';

export class TemplateResolvers {
  constructor(private readonly entitySchemaList: EntitySchema[]) {}

  entitiesSchemasListResolvers = [
    new BackendSystemInputListResolver(),
    new FrontendAppModuleListResolver(),
    new FrontendStoreListResolver(),
  ];
  entitySchemaResolvers = [
    new FrontEndIndexResolver(),
    new FrontEndPagesResolver(),
    new FrontEndComponentsResolver(),
    new FrontEndEntityComponentResolver(),
    new FrontEndUrlBuilderResolver(),
    new FrontEndRoutesResolver(),
    new FrontEndModuleResolver(),
    new FrontEndEntitySliceResolver(),
    new EnumResolver(),
  ];
  entitySchemaArgumentsResolvers = [
    new FormComponentResolver(),
    new ListColDefResolver(),
    new ItemColDefResolver(),
    new BackendSystemInputResolver(),
    new DtoResolver(),
  ];

  setSchema(entitySchema) {
    this.entitiesSchemasListResolvers.forEach((Resolver) =>
      Resolver.setSchema(entitySchema),
    );
    this.entitySchemaResolvers.forEach((Resolver) =>
      Resolver.setSchema(entitySchema),
    );
    this.entitySchemaArgumentsResolvers.forEach((Resolver) =>
      Resolver.setSchema(entitySchema),
    );
  }

  execute() {
    const allResolvers = [
      this.entitiesSchemasListResolvers,
      this.entitySchemaResolvers,
      this.entitySchemaArgumentsResolvers,
    ].flat();

    allResolvers.forEach((Resolver) => Resolver.execute());
  }

  resolve() {
    if (this.entitySchemaList.length < 1)
      throw new Error('Entity Schema not found');

    for (const entitySchema of this.entitySchemaList) {
      this.setSchema(entitySchema);
      for (const arg of entitySchema.arguments) {
        this.entitySchemaArgumentsResolvers.forEach((argResolver) =>
          argResolver.processArgument(arg),
        );
      }
      this.execute();
    }
  }
}
