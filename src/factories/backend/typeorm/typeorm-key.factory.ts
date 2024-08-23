import {
  ColumnDecoratorWithArgs,
  TypeOrmDecoratorNames,
  TypeOrmKeysEnumNameType,
} from '../../../types/global';
import { columDecoratorFactory } from './column-decorator.factory';
import {
  oneToManyArgs,
  typeormKeyOneToManyFactory,
} from './typeorm-key-one-to-many.factory';
import { TypeormKeyBaseFactory } from './typeorm-key-base.factory';

export class TypeOrmKeyFactory extends TypeormKeyBaseFactory {
  string({
    key,
    nullable,
    isOptional,
  }: {
    key: string;
    nullable?: boolean;
    isOptional?: boolean;
  }) {
    const decorators = this.resolveDecoratorFromDecoratorFactory(
      nullable
        ? //Important: columDecoratorFactory returns  object {'0':[columnDecorator]}, we use resolveDecoratorFromDecoratorFactory to ensemble the decorator[]
          columDecoratorFactory.stringNullable().build()
        : columDecoratorFactory.string().build(),
    );
    const type = 'string';

    return this.params(
      this.generic({
        decorators,
        key,
        type,
        isOptional,
      }).build(),
    );
  }

  jsonb({
    key,
    nullable,
    isOptional,
  }: {
    key: string;
    nullable?: boolean;
    isOptional?: boolean;
  }) {
    const decorators = this.resolveDecoratorFromDecoratorFactory(
      nullable
        ? columDecoratorFactory.jsonbNullable().build()
        : columDecoratorFactory.jsonb().build(),
    );
    const type = 'Record<string, any>';

    return this.params(
      this.generic({
        decorators: decorators,
        key,
        type,
        isOptional,
      }).build(),
    );
  }

  enum(args: { key: string; isOptional: boolean; name: string; path: string }) {
    const { name, path, ...others } = args;
    const params = {
      decorators: this.resolveDecoratorFromDecoratorFactory(
        columDecoratorFactory.enum(name, path).build(),
      ),
      type: name as TypeOrmKeysEnumNameType,
      ...others,
    };
    return this.params(this.generic(params).build());
  }

  genericEnum({
    key,
    type,
    decorators,
    isOptional,
  }: {
    key: string;
    type: string;
    decorators: [TypeOrmDecoratorNames | ColumnDecoratorWithArgs];
    isOptional: boolean;
  }) {
    const enumType = type as TypeOrmKeysEnumNameType;
    return this.params(
      this.generic({
        decorators,
        key,
        type: enumType,
        isOptional,
      }).build(),
    );
  }

  oneToMany(args: oneToManyArgs) {
    return this.params(typeormKeyOneToManyFactory.oneToMany(args).build());
  }
}

export const typeOrmKeyFactory = TypeOrmKeyFactory.define(() => ({}));

const relations = [
  {
    decorators: [
      [
        'OneToMany',
        {
          args: {
            target: 'ContactEntity',
            path: '../../contacts/entities/contact.entity',
            inverseSideFn: {
              arg: 'contact',
              returnedValue: 'contact.commercialEntity',
            },
          },
        },
      ],
      'JoinColumn',
    ],
    key: 'contacts',
    type: 'ContactEntity[]',
  },
  typeOrmKeyFactory
    .oneToMany({
      entityName: { singular: 'contact', plural: 'contacts' },
      inverseSideKey: 'commercialEntity',
      nextDecorators: ['JoinColumn'],
    })
    .build(),

  // {
  //   //TODO delete!!
  //   decorators: [
  //     [
  //       'OneToMany',
  //       {
  //         args: {
  //           target: 'NoteEntity',
  //           path: '../../notes/entities/note.entity',
  //           inverseSideFn: {
  //             arg: 'noteEntity',
  //             returnedValue: 'noteEntity.commercialEntity',
  //           },
  //           options: {},
  //         },
  //       },
  //     ],
  //   ],
  //   key: 'notes',
  //   type: 'NoteEntity[]',
  // },
  // {
  //   decorators: [
  //     [
  //       'OneToMany',
  //       {
  //         args: {
  //           target: 'InvoiceNoteEntity',
  //           path: '../../invoice-notes/entities/invoice-note.entity',
  //           inverseSideFn: {
  //             arg: 'invoiceNoteEntity',
  //             returnedValue: 'invoiceNoteEntity.customer',
  //           },
  //         },
  //       },
  //     ],
  //   ],
  //   key: 'invoices',
  //   type: 'InvoiceNoteEntity[]',
  // },
]; //TODO: create missing examples

const str2 = relations.map((i) => JSON.stringify(i, null, 2));
str2.forEach((i) => console.log(i));
// console.log(JSON.stringify(relations, null, 2));
console.log(str2[0] === str2[1]);
