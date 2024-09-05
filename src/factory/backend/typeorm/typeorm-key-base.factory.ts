import { Factory } from 'fishery';
import {
  ColumnDecoratorWithArgs,
  OneToManyDecoratorWithArgs,
  TypeOrmDecoratorNames,
  TypeOrmDecoratorType,
  TypeOrmEntity_Config_Interface,
  TypeOrmKeysEnumNameType,
  TypeOrmRelationsCascade,
} from '../../../types/global';
import { columDecoratorFactory } from './column-decorator.factory';
import { relationDecoratorFactory } from './relation-decorator.factory';
import { TextFormatGenerator } from '../../../lib/text-format-generator';

export class TypeormKeyBaseFactory extends Factory<TypeOrmEntity_Config_Interface> {
  protected resolveDecoratorFromDecoratorFactory(
    factoryBuild,
  ): TypeOrmDecorators {
    return [factoryBuild[0]];
  }

  generic({
    key,
    type,
    decorators,
    isOptional,
  }: {
    key: string;
    type: TypeOrmKeysTypes | TypeOrmKeysEnumNameType;
    decorators: TypeOrmDecorators;
    isOptional?: boolean;
  }) {
    return this.params({
      decorators: decorators,
      key,
      type,
      isOptional,
    });
  }
}

export const typeOrmKeyFactory = TypeormKeyBaseFactory.define(() => ({}));
