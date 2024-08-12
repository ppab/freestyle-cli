import {Factory} from "fishery";


import * as querystring from "node:querystring";

// urlBuilder: {
//     queryAll: {
//         context: ['params'], // as this route is being used to filter by invoiceNoteId we need to declare it in the context... /invoice-note-items/?relations=invoiceNote,product,productUnit&filters=invoiceNoteId:${params.id}
//             parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
//             relations: ['address'],
//     },
//     queryOne: {
//         context: ['params'],
//             parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/', 'params.id'],
//             relations: ['address'],
//     },
//     mutation: {
//         context: ['params'],
//             parts: ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
//             relations: ['address'],
//     },
// },


type UrlBuilderUrlArgs = {
    context: string[]
    parts: string[]
    relations: string[]
}
type UrlBuilder = {
    queryAll: UrlBuilderUrlArgs,
    queryOne: UrlBuilderUrlArgs,
    mutationOne: UrlBuilderUrlArgs,
}

export class UrlBuilderUrlArgsFactory extends Factory<UrlBuilderUrlArgs> {
    queryAll(args: { context?: string[], parts?: string[], relations?: string[] } = {}) {
        return this.params({
            context: args?.context ?? ['params'],
            parts: args?.parts ?? ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
            relations: args?.relations ?? []
        })
    }

    queryOne(args: { context?: string[], parts?: string[], relations?: string[] } = {}) {
        return this.params({
            context: args?.context ?? ['params'],
            parts: args?.parts ?? ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/', 'params.id'],
            relations: args?.relations ?? []
        })
    }

    mutationOne(args: { context?: string[], parts?: string[], relations?: string[] } = {}) {
        return this.params({
            context: args?.context ?? ['params'],
            parts: args?.parts ?? ['{{KEBAB_CASE_ENTITY_PLURAL}}', '/'],
            relations: args?.relations ?? []
        })
    }
}

export const urlBuilderUrlArgsFactory = UrlBuilderUrlArgsFactory.define(() => ({}))


export class UrlBuilderFactory extends Factory <UrlBuilder> {
    setRelations(relations?: string[]) {
        return this.params({
            queryAll: urlBuilderUrlArgsFactory.queryAll({relations}).build(),
            queryOne:
                urlBuilderUrlArgsFactory.queryOne({relations}).build(),
            mutationOne:
                urlBuilderUrlArgsFactory.mutationOne({relations}).build(),
        })
    }
}

export const urlBuilderFactory = UrlBuilderFactory.define(() => ({
    queryAll: urlBuilderUrlArgsFactory.queryAll().build(),
    queryOne:
        urlBuilderUrlArgsFactory.queryOne().build(),
    mutationOne:
        urlBuilderUrlArgsFactory.mutationOne().build(),
}))