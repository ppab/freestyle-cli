import { Factory } from 'fishery';
import { TypeOrmDecoratorType } from '../../../types/global';

class ColumDecoratorFactory extends Factory<TypeOrmDecoratorType[]> {
  returnArray(value) {
    return [value];
  }

  string() {
    return this.params(this.returnArray('Column'));
  }

  stringNullable() {
    return this.params(
      this.returnArray(['Column', { args: { nullable: true } }]),
    );
  }

  jsonbNullable() {
    return this.params(
      this.returnArray(['Column', { args: { type: 'jsonb', nullable: true } }]),
    );
  }

  jsonb() {
    return this.params(
      this.returnArray(['Column', { args: { type: 'jsonb' } }]),
    );
  }

  enum(name: string, path: string) {
    return this.params(
      this.returnArray(['Column', { args: { enum: { name, path } } }]),
    );
  }

  generic(decorator: TypeOrmDecoratorType[]) {
    return this.params(decorator);
  }
}

export const columDecoratorFactory = ColumDecoratorFactory.define(() => ({}));
