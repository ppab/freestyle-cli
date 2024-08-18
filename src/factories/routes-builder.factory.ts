import {Factory} from "fishery";

type RouteArgs = {
    role: string[]
    path: string
    exact: boolean;
    page: {
        name: string;
    }
}


export class RoutesFactory extends Factory<RouteArgs> {
    entityPlural(path?: string, pageName?: string) {
        return this.params({
                role: ['any'],

                path: path ?? '{{KEBAB_CASE_ENTITY_PLURAL}}',
                exact: true,
                page: {name: pageName ?? '{{PASCAL_CASE_ENTITY_PLURAL}}'},
            }
        )

    }

    createEntity(path?: string, pageName?: string) {
        return this.params(
            {
                role: ['any'],
                path: path ?? '{{KEBAB_CASE_ENTITY_PLURAL}}/create',
                exact: true,
                page: {
                    name: pageName ?? 'Create{{PASCAL_CASE_ENTITY}}'
                },
            },
        )
    }

    entity(path?: string, pageName?: string) {
        return this.params(
            {
                role: ['any'],
                path: path ?? '{{KEBAB_CASE_ENTITY_PLURAL}}/:id',
                exact: true,
                page: {
                    name: pageName ?? '{{PASCAL_CASE_ENTITY}}'
                },
            },
        )
    }


}

export const routesFactory = RoutesFactory.define(() => ({}))

export const routesGenericFactory = {
    build: ({KEBAB_CASE_ENTITY_PLURAL, PASCAL_CASE_ENTITY, PASCAL_CASE_ENTITY_PLURAL}: {
        KEBAB_CASE_ENTITY_PLURAL?: string,
        PASCAL_CASE_ENTITY?: string,
        PASCAL_CASE_ENTITY_PLURAL?: string
    }) => ([
        routesFactory.entityPlural(KEBAB_CASE_ENTITY_PLURAL, PASCAL_CASE_ENTITY_PLURAL).build(),
        routesFactory.entity(KEBAB_CASE_ENTITY_PLURAL, PASCAL_CASE_ENTITY,).build(),
        routesFactory.createEntity(KEBAB_CASE_ENTITY_PLURAL, PASCAL_CASE_ENTITY).build()
    ])
}

