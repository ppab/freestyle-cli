import { commercialEntityArgumentsEnum } from './commercial-entities.entity-schema';

export const typeormKeys = [
  {
    decorators: ['Column'],
    key: 'name',
    type: 'string',
  },
  {
    decorators: ['Column'],
    key: 'displayName',
    type: 'string',
  },
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
    isOptional: false,
    type: 'CommercialEntityCategory',
  },
  {
    key: 'taxId',
    decorators: ['Column'],
    type: 'string',
  },
  {
    key: 'taxRegime',
    decorators: [['Column', { args: { nullable: true } }]],
    isOptional: true,
    type: 'string',
  },
  {
    decorators: [['Column', { args: { type: 'jsonb', nullable: true } }]],
    key: 'customFields',
    isOptional: true,
    type: 'Record<string, any>',
  },
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
];
