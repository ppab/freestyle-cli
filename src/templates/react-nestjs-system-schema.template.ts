import {reactFrontendSchema} from "./frontend-schemas/react-frontend-schema";
import {nestjsBackendSchema} from "./backend-schemas/nestjs-backend-schema";
import entities from "./entities.json"

export const systemSchema = {
    name: 'SystemName',
    // frontEnd: reactFrontendSchema,
    // backend: nestjsBackendSchema,
    entities: entities
}

console.log("systemSchema", systemSchema)