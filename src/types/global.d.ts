import { ColumType } from 'typeor';

export {};
export type PathDefinitionType =
  | {
      path: string;
      dir?: never;
      fileName?: never;
    }
  | {
      dir: string[] | string;
      fileName: string[] | string;
      path?: never;
    };

declare global {
  type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;
  type CreatePropertyOptional<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;

  type TemplateConfig = {
    name: string;
    dir: string[];
    fileName: string[];
    templateFileName: string;
    contentDestination?: PathDefinitionType;
    templateSource?: PathDefinitionType;
    unique?: boolean;
    context?: {
      [key: string]: 'string';
    };
  };

  type FrontEndModulesSchema = {};
  type BackendModulesSchema = {};
  type FrontEndSchema = {
    name: 'react';
    args: {
      stateManagement: 'redux';
      components: ['EntitiesList', 'CreateItem'];
      appNavigation: {
        [key: string]: string;
      };
      modules: FrontEndModulesSchema[];
    };
    templates: TemplateConfig[];
  };
  type BackendEnvsSource = '.env' | 'secretsManager';
  type BackendMiddleware = 'cookieParser' | 'helmet';

  type BackendSchema = {
    name: 'nestJs';
    args: {
      main: {
        cors: { args: { allowedOrigins: string[] } };
        validationPipe: {
          whitelist: boolean;
          forbidNonWhitelisted: boolean;
          transform: boolean;
          transformOptions: { enableImplicitConversion: boolean };
        };
        envs: {
          source: BackendEnvsSource;
        };
        middleware: BackendMiddleware[];
      };
      typeOrm: {
        databases: [
          {
            name: string;
            config: { [key: string]: string };
          },
        ];
      };
      modules: BackendModulesSchema[];
    };
    templates: TemplateConfig[];
  };
  type SystemSchema = {
    name: string;
    frontEnd: FrontEndSchema;
    backend: BackendSchema;
    entities: {
      [key: string]: string;
    };
  };

  type BuilderContext = EntityNameFormats &
    DTO_CONTEXT &
    SCHEMA_CONTEXT &
    FORM_CONTEXT &
    COL_DEF_CONTEXT;

  type DTO_CONTEXT = {
    DTO_DECORATORS_IMPORT: string;
    DTO_OTHER_IMPORTS_JOINT: string;
    DTO_CLASS_NAME: string;
    DTO_FIELDS_CONTENT: string;
  };

  type SCHEMA_CONTEXT = {
    SCHEMA: string;
  };
  type FORM_CONTEXT = {
    FORM_CREATE: string;
  };

  type COL_DEF_CONTEXT = {
    COL_DEF_LIST: string;
  };

  ////////////////////
  type ClassValidators =
    | 'IsOptional'
    | 'IsString'
    | 'IsUUID'
    | 'IsArray'
    | 'ArrayNotEmpty'
    | 'IsBoolean'
    | 'IsDate'
    | 'IsEnum'
    | 'IsEmail'
    | 'IsInt'
    | 'IsNumber'
    | 'IsObject'
    | 'IsPositive'
    | 'Max'
    | 'Min'
    | 'IsDateString'
    | 'IsNotEmpty'
    | 'ValidateNested';

  type ClassTransformers = 'Type';

  type DtoDecoratorWithArgs = [
    ClassValidators | ClassTransformers,
    { args: any; path?: string },
  ];
  type DtoDecoratorType =
    | ClassValidators
    | ClassTransformers
    | DtoDecoratorWithArgs;

  export type DtoDecorators = DtoDecoratorType[];

  ////TypeOrmDecoratorsArgs

  export type OneToManyDecoratorArgs = {
    target: string;
    path: string;
    inverseSideFn: {
      arg: string;
      returnedValue: string;
    };
    options?: {
      cascade?: TypeOrmRelationsCascade;
    };
  };
  type EnumDecoratorArgs = {
    name: string;
    path: string;
  };

  type TypeOrmDecoratorArgs =
    | OneToManyDecoratorArgs
    | EnumDecoratorArgs
    | ColumnDecoratorArgs;

  export type ColumnDecoratorArgs = {
    nullable?: boolean;
    type?: ColumnType;
    enum?: EnumDecoratorArgs;
  };

  type TypeOrmDecoratorWithArgs = [
    TypeOrmDecoratorNames,
    {
      args: TypeOrmDecoratorArgs;
      path?: string;
    },
  ];

  export type TypeOrmKeysTypes =
    | 'string'
    | 'string[]'
    | 'number'
    | 'number[]'
    | 'Record<string, any>'
    | 'int'
    | 'float'
    | 'int64'
    | 'long';

  export type TypeOrmDecorators = TypeOrmDecoratorType[];

  export type SystemInput = {
    entity: string;
    entityPlural: string;
    generateFiles?: [
      'Module',
      'Service',
      'Controller',
      'entity',
      'EntityDto',
      'CreateDto',
      'UpdateDto',
    ];
    enums?: any[];
    dto: { create: DTO_Config_Interface[] };
    typeOrm?: any;
  };
}
export type DTO_Config_Interface = {
  key: string;
  type: string;
  decorators: DtoDecorators;
};
export type TypeOrmRelationsCascade =
  | boolean
  | ('insert' | 'update' | 'remove' | 'soft-remove' | 'recover')[];
export type TypeOrmDecoratorType =
  | TypeOrmDecoratorNames
  | TypeOrmDecoratorWithArgs
  | ColumnDecoratorWithArgs
  | OneToManyDecoratorWithArgs;
export type ColumnDecoratorWithArgs = ['Column', { args: ColumnDecoratorArgs }];

export type OneToManyDecoratorWithArgs = [
  'OneToMany',
  { args: OneToManyDecoratorArgs },
];
export type TypeOrmDecoratorNames =
  | 'Column'
  | 'Entity'
  | 'JoinColumn'
  | 'ManyToOne'
  | 'OneToMany';
export type TypeOrmKeysEnumNameType = string;
export type TypeOrmEntity_Config_Interface = {
  key: string;
  type: TypeOrmKeysTypes | TypeOrmKeysEnumNameType;
  isOptional?: boolean;
  decorators: TypeOrmDecoratorType[];
};

export type UrlBuilderQueryParameters = {
  relations?: string[];
  filters?: { [key: string]: string };
  search?: { [key: string]: string };
  jsonSearch?: { [key: string]: { [key: string]: string } };
};
