export const nestjsBackendSchema: BackendSchema =
    {
        name: 'nestJs',
        args: {
            main: {
                cors: {
                    args: {
                        allowedOrigins: [
                            'http://localhost:5173',
                            'https://first-build.*.amplifyapp.com/',
                        ]
                    }
                },
                validationPipe: {
                    whitelist: true,
                    forbidNonWhitelisted: true,
                    transform: true,
                    transformOptions: {enableImplicitConversion: true}
                },
                envs: {
                    source: '.env',
                },
                middleware: ['cookieParser', 'helmet']
            },
            typeOrm: {
                databases: [
                    {
                        name: 'test',
                        config: {}
                    }
                ]
            },
            modules: ["{{FRONTEND_MODULES"]
        },
        templates: [
            {
                name: 'nestjs/service',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}'],
                fileName: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '.service.ts'],
                templateFileName: 'generic-service.txt',
                //////
                //////
                //// New Schema
                ///template source and template destination could be an object or a string, if string it will be the path.
                contentDestination: {
                    dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}'],
                    fileName: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '.service.ts'],
                },
                // If template source is not  defined it will default to the templates provided in the library
                templateSource: {
                    dir: ['templates'],
                    fileName: ['generic-service.txt'],
                },
                /// you can inject custom Context values, it will have the context object to be resolved
                context: {
                    // entity: 'MY NEW VALUE!!!',
                    // KEBAB_CASE_ENTITY_PLURAL: 'MY NEWEST VALUE->>>',
                },
            },
            {
                name: 'nestjs/controller',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}'],
                fileName: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '.controller.ts'],
                templateFileName: 'generic-controller.txt',
            },
            {
                name: 'nestjs/module',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}'],
                fileName: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '.module.ts'],
                templateFileName: 'generic-module.txt',
            },
            {
                name: 'nestjs/entity',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}', 'entities'],
                fileName: ['{{KEBAB_CASE_ENTITY}}', '.entity.ts'],
                templateFileName: 'generic-entity.txt',
            },
            {
                name: 'nestjs/entityDto',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}', 'dto'],
                fileName: ['{{KEBAB_CASE_ENTITY}}', '.dto.ts'],
                templateFileName: 'generic-entity-dto.txt',
            },
            {
                name: 'nestjs/createDto',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}', 'dto'],
                fileName: ['create-', '{{KEBAB_CASE_ENTITY}}', '.dto.ts'],
                templateFileName: 'generic-create-entity-dto.txt',
            },
            {
                name: 'nestjs/update',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}', 'dto'],
                fileName: ['update-', '{{KEBAB_CASE_ENTITY}}', '.dto.ts'],
                templateFileName: 'generic-update-entity-dto.txt',
            },
            {
                name: 'nestjs/dtoWithGenerators',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}', 'dto'],
                fileName: ['create-', '{{KEBAB_CASE_ENTITY}}', '.dto.ts'],
                templateFileName: 'generic-dto-with-decorators.txt',
            },
            {
                name: 'nestjs/dtoWithGenerators',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}', 'entities'],
                fileName: ['{{KEBAB_CASE_ENTITY}}', '.entity.ts'],
                templateFileName: 'generic-entity-with-decorators.txt',
            },
            {
                name: 'nestjs/enums',
                dir: ['src', '{{KEBAB_CASE_ENTITY_PLURAL}}', 'enums'],
                fileName: ['{{ENUM_NAME_KEBAB_CASE}}', '.enum.ts'],
                templateFileName: 'generic-enum.txt',
                unique: false,
            },

        ]
    }
