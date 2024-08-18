import {SystemInput} from '../../bin/react-crud-redux/types';
import frontEnd from './frontEnd';
import * as entities from '../entities.json';

export const TestPluralModule: SystemInput = {
    entity: entities.test.KEBAB_CASE_ENTITY,
    entityPlural: entities.test.KEBAB_CASE_ENTITY_PLURAL,
    frontEnd,
    dto: {},
};