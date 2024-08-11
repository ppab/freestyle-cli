import {reactFrontendSchema} from "./frontend-schemas/react-frontend-schema";
import {nestjsBackendSchema} from "./backend-schemas/nestjs-backend-schema";

export const systemSchema: SystemSchema = {
    name: 'SystemName',
    frontEnd: reactFrontendSchema,
    backend: nestjsBackendSchema,
    entities: ,
}