import { Factory } from 'fishery';
import {
  ColumnDecoratorWithArgs,
  EnumDecoratorWithArgs,
  TypeOrmDecoratorNames,
  TypeOrmEntity_Config_Interface,
  TypeOrmKeysEnumNameType,
} from '../../types/global';
import { ColumnType } from '../../types/TypeormColumnTypes';

const examples = [
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
            options: {
              cascade: true,
            },
          },
        },
      ],
      'JoinColumn',
    ],
    key: 'contacts',
    type: 'ContactEntity[]',
  },

  {
    //TODO delete!!
    decorators: [
      [
        'OneToMany',
        {
          args: {
            target: 'NoteEntity',
            path: '../../notes/entities/note.entity',
            inverseSideFn: {
              arg: 'noteEntity',
              returnedValue: 'noteEntity.commercialEntity',
            },
            options: {},
          },
        },
      ],
    ],
    key: 'notes',
    type: 'NoteEntity[]',
  },
  {
    decorators: [
      [
        'OneToMany',
        {
          args: {
            target: 'InvoiceNoteEntity',
            path: '../../invoice-notes/entities/invoice-note.entity',
            inverseSideFn: {
              arg: 'invoiceNoteEntity',
              returnedValue: 'invoiceNoteEntity.customer',
            },
          },
        },
      ],
    ],
    key: 'invoices',
    type: 'InvoiceNoteEntity[]',
  },
]; //TODO: create missing examples

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

export class TypeOrmKeyFactory extends Factory<TypeOrmEntity_Config_Interface> {
  private resolveDecoratorFromDecoratorFactory(factoryBuild) {
    return [factoryBuild[0]];
  }

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
        ? columDecoratorFactory.stringNullable().build()
        : columDecoratorFactory.string().build(),
    );
    return this.params({
      decorators,
      key,
      type: 'string',
      isOptional,
    });
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
    //this factory returns an object {'0':[columnDecorator]}
    return this.params({
      decorators: decorators,
      key,
      type: 'Record<string, any>',
      isOptional,
    });
  }

  enum({
    key,
    isOptional,
    name,
    path,
  }: {
    key: string;
    nullable?: boolean;
    isOptional?: boolean;
    name: string;
    path: string;
  }) {
    return this.params({
      decorators: this.resolveDecoratorFromDecoratorFactory(
        columDecoratorFactory.enum(name, path).build(),
      ),
      key,
      type: name,
      isOptional,
    });
  }

  generic({
    key,
    type,
    decorators,
  }: {
    key: string;
    type: TypeOrmKeysTypes;
    decorators: TypeOrmDecorators;
  }) {
    return this.params({
      decorators: decorators,
      key,
      type,
    });
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
    return this.params({
      decorators: decorators,
      key,
      type,
      isOptional,
    });
  }
}

export const typeOrmKeyFactory = TypeOrmKeyFactory.define(() => ({}));

const str: TypeOrmEntity_Config_Interface[] = [
  {
    decorators: [['Column', { args: { nullable: true } }]],
    key: 'name',
    type: 'string',
  },
  typeOrmKeyFactory.string({ key: 'name', nullable: true }).build(),
  {
    decorators: ['Column'],
    key: 'displayName',
    type: 'string',
  },
  typeOrmKeyFactory.string({ key: 'displayName' }).build(),

  {
    decorators: ['Column'],
    key: 'taxId',
    type: 'string',
  },
  typeOrmKeyFactory.string({ key: 'taxId' }).build(),

  {
    decorators: [['Column', { args: { nullable: true } }]],
    key: 'taxRegime',
    type: 'string',
    isOptional: true,
  },
  typeOrmKeyFactory
    .string({ key: 'taxRegime', nullable: true, isOptional: true })
    .build(),
  {
    decorators: ['Column'],
    key: 'other',
    type: 'string',
    isOptional: true,
  },
  typeOrmKeyFactory.string({ key: 'other', isOptional: true }).build(),
];

const json: TypeOrmEntity_Config_Interface[] = [
  {
    decorators: [['Column', { args: { type: 'jsonb', nullable: true } }]],
    key: 'customFields',
    type: 'Record<string, any>',
    isOptional: true,
  },
  typeOrmKeyFactory
    .jsonb({ key: 'customFields', nullable: true, isOptional: true })
    .build(),
];

const enums: TypeOrmEntity_Config_Interface[] = [
  {
    decorators: [
      [
        'Column',
        {
          args: {
            enum: {
              name: 'CommercialEntityCategory',
              path: '../../commercial-entities/enums/commercial-entity-category.enum',
            },
          },
        },
      ],
    ],
    key: 'category',
    type: 'CommercialEntityCategory',
    isOptional: false,
  },
  typeOrmKeyFactory
    .genericEnum({
      decorators: [
        [
          'Column',
          {
            args: {
              enum: {
                name: 'CommercialEntityCategory',
                path: '../../commercial-entities/enums/commercial-entity-category.enum',
              },
            },
          },
        ],
      ],
      key: 'category',
      type: 'CommercialEntityCategory',
      isOptional: false, // this prop can be omited,
    })
    .build(),

  typeOrmKeyFactory
    .enum({
      key: 'category',
      name: 'CommercialEntityCategory',
      path: '../../commercial-entities/enums/commercial-entity-category.enum',
      isOptional: false, // this prop can be omited,
    })
    .build(),
];
const str2 = str.map((i) => JSON.stringify(i));
console.log(JSON.stringify(str, null, 2));
console.log(str2[0] === str2[1]);
