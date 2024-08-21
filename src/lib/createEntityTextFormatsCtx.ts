import {
  TextFormatGenerator,
  EntityNameFormats,
} from './text-format-generator';
import { mapKeysWithPrefixOrSuffix } from './mapKeysWithPrefixOrSuffix';

export type EntityTextFormatsCtx = ReturnType<
  typeof createEntityTextFormatsCtx
>;
export const createEntityTextFormatsCtx = (entity, entityPlural) => {
  console.log('createEntityTextFormatsCtx->>', entity);
  const entityFormats = new TextFormatGenerator(entity).generateFormats();
  const entityPluralFormats = new TextFormatGenerator(
    entityPlural,
  ).generateFormats();

  // console.log('entity->', entity);
  // console.log('entityPlural->', entityPlural);
  const a = mapKeysWithPrefixOrSuffix(entityFormats, {
    suffix: '_ENTITY',
  });
  const b = mapKeysWithPrefixOrSuffix(entityPluralFormats, {
    suffix: '_ENTITY_PLURAL',
  });
  const context = {
    ...a,
    ...b,
  } as EntityNameFormats;

  return context;
};
