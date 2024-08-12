import {urlBuilderUrlArgsFactory} from "./url-builder.factory"

describe('UrlBuilderUrlArgsFactory', () => {
    describe('queryAll()', () => {
        describe('when no params are defined', () => {
            it('should return expected value', () => {
                const subject = urlBuilderUrlArgsFactory.queryAll().build()
                const expected =
                    {
                        context: ['params'],
                        parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                        relations: ['']
                    }

                expect(subject).toEqual(expected);
            })
        })
        describe('when params are defined', () => {
            it('should return expected value', () => {
                const params = {
                    context: ['test-context', '1'],
                    parts: ['test-part'],
                    relations: ['test-relations']
                }
                const subject = urlBuilderUrlArgsFactory.queryAll(params).build()
                const expected =
                    {
                        context: ['test-context', '1'],
                        parts: ['test-part',],
                        relations: ['test-relations'],
                    }

                expect(subject).toEqual(expected);
            })
            it('should return expected value', () => {
                const params = {
                    context: ['test-context', '1'],
                    relations: ['test-relations']
                }
                const subject = urlBuilderUrlArgsFactory.queryAll(params).build()
                const expected =
                    {
                        context: ['test-context', '1'],
                        parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                        relations: ['test-relations'],
                    }

                expect(subject).toEqual(expected);
            })
            it('should return expected value', () => {
                const params = {
                    relations: ['my-relation']
                }
                const subject = urlBuilderUrlArgsFactory.queryAll(params).build()
                const expected =
                    {
                        context: ['params'],
                        parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                        relations: ['my-relation'],
                    }

                expect(subject).toEqual(expected);
            })
        })


    })
    describe('queryOne()', () => {
        describe('when no params are defined', () => {
            it('should return expected value', () => {
                const subject = urlBuilderUrlArgsFactory.queryOne().build()
                const expected =
                    {
                        context: ['params'],
                        parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/', 'params.id'],
                        relations: ['']
                    }

                expect(subject).toEqual(expected);
            })
        })
        describe('when params are defined', () => {
            it('should return expected value', () => {
                const params = {
                    context: ['test-context', '1'],
                    parts: ['test-part'],
                    relations: ['test-relations']
                }
                const subject = urlBuilderUrlArgsFactory.queryOne(params).build()
                const expected =
                    {
                        context: ['test-context', '1'],
                        parts: ['test-part',],
                        relations: ['test-relations'],
                    }

                expect(subject).toEqual(expected);
            })
            it('should return expected value', () => {
                const params = {
                    context: ['test-context', '1'],
                    relations: ['test-relations']
                }
                const subject = urlBuilderUrlArgsFactory.queryOne(params).build()
                const expected =
                    {
                        context: ['test-context', '1'],
                        parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/', 'params.id'],
                        relations: ['test-relations'],
                    }

                expect(subject).toEqual(expected);
            })
            it('should return expected value', () => {
                const params = {
                    relations: ['my-relation']
                }
                const subject = urlBuilderUrlArgsFactory.queryAll(params).build()
                const expected =
                    {
                        context: ['params'],
                        parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                        relations: ['my-relation'],
                    }

                expect(subject).toEqual(expected);
            })
        })


    })
    describe('mutationOne()', () => {
        describe('when no params are defined', () => {
            it('should return expected value', () => {
                const subject = urlBuilderUrlArgsFactory.mutationOne().build()
                const expected =
                    {
                        context: ['params'],
                        parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                        relations: ['']
                    }

                expect(subject).toEqual(expected);
            })
        })
        describe('when params are defined', () => {
            it('should return expected value', () => {
                const params = {
                    context: ['test-context', '1'],
                    parts: ['test-part'],
                    relations: ['test-relations']
                }
                const subject = urlBuilderUrlArgsFactory.mutationOne(params).build()
                const expected =
                    {
                        context: ['test-context', '1'],
                        parts: ['test-part',],
                        relations: ['test-relations'],
                    }

                expect(subject).toEqual(expected);
            })
            it('should return expected value', () => {
                const params = {
                    context: ['test-context', '1'],
                    relations: ['test-relations']
                }
                const subject = urlBuilderUrlArgsFactory.mutationOne(params).build()
                const expected =
                    {
                        context: ['test-context', '1'],
                        parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                        relations: ['test-relations'],
                    }

                expect(subject).toEqual(expected);
            })
            it('should return expected value', () => {
                const params = {
                    relations: ['my-relation']
                }
                const subject = urlBuilderUrlArgsFactory.mutationOne(params).build()
                const expected =
                    {
                        context: ['params'],
                        parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
                        relations: ['my-relation'],
                    }

                expect(subject).toEqual(expected);
            })
        })

    })

})