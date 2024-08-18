import {routesGenericFactory} from "./routes-builder.factory";

describe.only('routesFactory', () => {
    describe('generic()', () => {
        describe('when no params are defined', () => {
            it('should return expected value', () => {
                const subject = routesGenericFactory.build()
                const expected =
                    [
                        {
                            role: ['any'],

                            path: '{{KEBAB_CASE_ENTITY_PLURAL}}',
                            exact: true,
                            page: {name: '{{PASCAL_CASE_ENTITY_PLURAL}}'},
                        },

                        {
                            role: ['any'],
                            path: '{{KEBAB_CASE_ENTITY_PLURAL}}/:id',
                            exact: true,
                            page: {
                                name: '{{PASCAL_CASE_ENTITY}}'
                            },
                        },
                        {
                            role: ['any'],
                            path: '{{KEBAB_CASE_ENTITY_PLURAL}}/create',
                            exact: true,
                            page: {name: 'Create{{PASCAL_CASE_ENTITY}}'},
                        },
                    ]


                expect(subject).toEqual(expected);
            })
        })


    })

})