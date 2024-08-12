import {urlBuilderFactory} from "./url-builder.factory"

describe.only('urlBuilderFactory', () => {
    describe('build()', () => {
        describe('when no params are defined', () => {
            it('should return expected value', () => {
                const subject = urlBuilderFactory.build()
                const expected =
                    {
                        queryAll: {
                            context: ['params'],
                            parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                            relations: ['']
                        },
                        queryOne: {
                            context: ['params'],
                            parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/', 'params.id'],
                            relations: ['']
                        },
                        mutationOne: {
                            context: ['params'],
                            parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                            relations: ['']
                        }
                    }


                expect(subject).toEqual(expected);
            })
        })
        describe('when params are defined', () => {
            it('should return expected value', () => {
                const subject = urlBuilderFactory.setRelations(["relation1", "relation2"]).build()
                const expected =
                    {
                        queryAll: {
                            context: ['params'],
                            parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                            relations: ["relation1", "relation2"]
                        },
                        queryOne: {
                            context: ['params'],
                            parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/', 'params.id'],
                            relations: ["relation1", "relation2"]
                        },
                        mutationOne: {
                            context: ['params'],
                            parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                            relations: ["relation1", "relation2"]
                        }
                    }


                expect(subject).toEqual(expected);
            })
            it('should return expected value', () => {
                const subject = urlBuilderFactory.setRelations().build()
                const expected =
                    {
                        queryAll: {
                            context: ['params'],
                            parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                            relations: []
                        },
                        queryOne: {
                            context: ['params'],
                            parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/', 'params.id'],
                            relations: []
                        },
                        mutationOne: {
                            context: ['params'],
                            parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                            relations: []
                        }
                    }


                expect(subject).toEqual(expected);
            })
        })


    })

})