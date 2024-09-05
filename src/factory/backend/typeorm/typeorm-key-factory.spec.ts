import { typeOrmKeyFactory } from './typeorm-key.factory';

describe('typeormKeys', () => {
  describe('oneToMany()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
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
      ];

      expect(base).toEqual(factory);
    });
  });
  describe('string()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          decorators: [['Column', { args: { nullable: true } }]],
          key: 'name',
          type: 'string',
        },

        typeOrmKeyFactory.string({ key: 'name', nullable: true }).build(),
      ];

      expect(base).toEqual(factory);
    });
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          decorators: [['Column', { args: { nullable: true } }]],
          key: 'name',
          type: 'string',
        },

        typeOrmKeyFactory.string({ key: 'name', nullable: true }).build(),
      ];

      expect(base).toEqual(factory);
    });
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          decorators: [['Column', { args: { nullable: true } }]],
          key: 'name',
          type: 'string',
        },

        typeOrmKeyFactory.string({ key: 'name', nullable: true }).build(),
      ];

      expect(base).toEqual(factory);
    });
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          decorators: ['Column'],
          key: 'displayName',
          type: 'string',
        },
        typeOrmKeyFactory.string({ key: 'displayName' }).build(),
      ];

      expect(base).toEqual(factory);
    });

    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          decorators: ['Column'],
          key: 'taxId',
          type: 'string',
        },
        typeOrmKeyFactory.string({ key: 'taxId' }).build(),
      ];

      expect(base).toEqual(factory);
    });

    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          decorators: [['Column', { args: { nullable: true } }]],
          key: 'taxRegime',
          type: 'string',
          isOptional: true,
        },
        typeOrmKeyFactory
          .string({ key: 'taxRegime', nullable: true, isOptional: true })
          .build(),
      ];

      expect(base).toEqual(factory);
    });
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
        {
          decorators: ['Column'],
          key: 'other',
          type: 'string',
          isOptional: true,
        },
        typeOrmKeyFactory.string({ key: 'other', isOptional: true }).build(),
      ];

      expect(base).toEqual(factory);
    });
  });
  describe('jsonb()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
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

      expect(base).toEqual(factory);
    });
  });

  describe('enum()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
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

      expect(base).toEqual(factory);
    });
  });
  describe('genericEnum()', () => {
    it('should be able to recreate the base object', () => {
      const [base, factory] = [
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
      ];

      expect(base).toEqual(factory);
    });
  });
});
