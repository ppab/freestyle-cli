import { TypeormKeyBaseFactory } from './typeorm-key-base.factory';
import {
  OneToManyDecoratorWithArgs,
  TypeOrmDecoratorType,
  TypeOrmRelationsCascade,
} from '../../../types/global';
import { TextFormatGenerator } from '../../../lib/text-format-generator';
import { relationDecoratorFactory } from './relation-decorator.factory';
export type oneToManyArgs = {
  key?: string;
  inverseSideKey: string;
  options?: { cascade?: TypeOrmRelationsCascade };
  nextDecorators?: TypeOrmDecoratorType[];
  entityName: {
    singular: string;
    plural: string;
  };
};
export class TypeormKeyOneToManyFactory extends TypeormKeyBaseFactory {
  oneToMany({
    entityName,
    inverseSideKey,
    key,
    options,
    nextDecorators,
  }: oneToManyArgs) {
    const entity = TextFormatGenerator.FromPascalCase(entityName.singular);
    const entityPlural = TextFormatGenerator.FromPascalCase(entityName.plural);
    const type = `${entity.PASCAL_CASE}Entity[]`;
    const args: OneToManyDecoratorArgs = {
      target: `${entity.PASCAL_CASE}Entity`,
      path: `../../${entityPlural.KEBAB_CASE}/entities/${entityName.singular}.entity`,
      inverseSideFn: {
        arg: entity.CAMEL_CASE,
        returnedValue: `${entity.CAMEL_CASE}.${inverseSideKey}`,
      },
      options,
    };
    const oneToManyDecorator: OneToManyDecoratorWithArgs = [
      'OneToMany',
      { args },
    ];

    const typeOrmFactory = this.oneToManyGeneric({
      oneToManyDecorator,
      key: key ?? entityPlural.CAMEL_CASE,
      type,
    }).build();
    if (nextDecorators) {
      typeOrmFactory.decorators = [
        ...typeOrmFactory.decorators,
        ...nextDecorators,
      ];
    }

    return this.params(typeOrmFactory);
  }

  oneToManyGeneric({
    key,
    type,
    oneToManyDecorator,
  }: {
    key: string;
    type: string;
    oneToManyDecorator: OneToManyDecoratorWithArgs;
  }) {
    const args = oneToManyDecorator[1].args;
    return this.params(
      this.generic({
        decorators: this.resolveDecoratorFromDecoratorFactory(
          relationDecoratorFactory.genericOneToMany(args).build(),
        ),
        key,
        type,
      }).build(),
    );
  }
}

export const typeormKeyOneToManyFactory = TypeormKeyOneToManyFactory.define(
  () => ({}),
);
