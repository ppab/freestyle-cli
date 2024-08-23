import { Factory } from 'fishery';
import { TypeOrmDecoratorType } from '../../../types/global';

class RelationDecoratorFactory extends Factory<TypeOrmDecoratorType[]> {
  returnArray(value) {
    return [value];
  }

  genericOneToMany({
    target,
    path,
    inverseSideFn,
    options,
  }: OneToManyDecoratorArgs) {
    return this.params(
      this.returnArray([
        'OneToMany',
        {
          args: {
            target,
            path,
            inverseSideFn,
            options,
          },
        },
      ]),
    );
  }
}

export const relationDecoratorFactory = RelationDecoratorFactory.define(
  () => ({}),
);
