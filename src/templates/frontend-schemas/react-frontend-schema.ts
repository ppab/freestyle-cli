export const reactFrontendSchema: FrontEndSchema = {
    name: 'react',
    templates: [
        {
            name: 'react-module/pages',
            dir: ['src', 'modules', '{{PASCAL_CASE_ENTITY_PLURAL}}'],
            fileName: ['Pages.tsx'],
            templateFileName: 'generic-pages.txt',
        },
        {
            name: 'react-module/components',
            dir: ['src', 'modules', '{{PASCAL_CASE_ENTITY_PLURAL}}'],
            fileName: ['{{PASCAL_CASE_ENTITY_PLURAL}}', '.components.tsx'],
            templateFileName: 'generic-components.txt',
        },
        {
            name: 'react-module/forms/create-form',
            dir: ['src', 'modules', '{{PASCAL_CASE_ENTITY_PLURAL}}', 'forms'],
            fileName: ['create-form.config.ts'],
            templateFileName: 'generic-create-form.txt',
        },

        {
            name: 'react-module/colDefs-list',
            dir: ['src', 'modules', '{{PASCAL_CASE_ENTITY_PLURAL}}', 'colDefs'],
            fileName: ['{{KEBAB_CASE_ENTITY_PLURAL}}-list-col-def.ts'],
            templateFileName: 'generic-list-col-def.txt',
        },
        {
            name: 'react-module/colDefs-item',
            dir: ['src', 'modules', '{{PASCAL_CASE_ENTITY_PLURAL}}', 'colDefs'],
            fileName: ['{{KEBAB_CASE_ENTITY}}-item-col-def.ts'],
            templateFileName: 'generic-item-col-def.txt',
        },

        {
            name: 'react-module/dto-create',
            dir: ['src', 'modules', '{{PASCAL_CASE_ENTITY_PLURAL}}', 'dto'],
            fileName: ['create-dto.ts'],
            templateFileName: 'generic-dto-create.txt',
        },

        {
            name: 'react-module/schema',
            dir: ['src', 'modules', '{{PASCAL_CASE_ENTITY_PLURAL}}'],
            fileName: ['resource.schema.ts'],
            templateFileName: 'generic-schema.txt',
        },
        {
            name: 'react-module/module',
            dir: ['src', 'modules', '{{PASCAL_CASE_ENTITY_PLURAL}}'],
            fileName: ['{{PASCAL_CASE_ENTITY_PLURAL}}', '.module.ts'],
            templateFileName: 'generic-module.txt',
        },
        {
            name: 'react-module/entity-component',
            dir: ['src', 'modules', '{{PASCAL_CASE_ENTITY_PLURAL}}'],
            fileName: ['{{PASCAL_CASE_ENTITY}}', '.tsx'],
            templateFileName: 'generic-entity-component.txt',
        },
        {
            name: 'react-module/slice',
            dir: ['src', 'store'],
            fileName: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '-slice.ts'],
            templateFileName: 'generic-slice.txt',
        },
        {
            name: 'react-module/slice',
            dir: ['src', 'store'],
            fileName: ['store.ts'],
            templateFileName: 'generic-store.txt',
            unique: true,
        },
        {
            name: 'react-module/app.module',
            dir: ['src', 'modules'],
            fileName: ['app.module.tsx'],
            templateFileName: 'generic-app-module.txt',
            unique: true,
        },

    ],
    args: {
        stateManagement: 'redux',
        components: [
            'EntitiesList', 'CreateItem',
        ],
        appNavigation: {
            Catalog: 'Catalog',
            Config: 'Config',
        },
        modules: []
    },

}
