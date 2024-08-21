import { createEntityTextFormatsCtx } from '../../src/lib/createEntityTextFormatsCtx';
import { strReplaceRegexMatchFromContext } from '../../src/lib/strReplaceRegexMatchFromContext';

/**
 * TODO: Add Tests for this class
 **/
export class StringWithEntityCtxResolver {
  ctx: { [key: string]: string };

  constructor(private entityName: { singular: string; plural: string }) {
    this.entityName = entityName;
  }

  createContext() {
    this.ctx = createEntityTextFormatsCtx(
      this.entityName.singular,
      this.entityName.plural,
    );
  }

  resolveString(str: string) {
    if (!this.ctx) throw Error('Context has not been set up');
    return strReplaceRegexMatchFromContext(str, this.ctx);
  }

  static execute(
    entityName: { singular: string; plural: string },
    str: string,
  ) {
    const resolver = new StringWithEntityCtxResolver(entityName);
    resolver.createContext();
    return resolver.resolveString(str);
  }
}

// const entityName = {
//   singular: 'email',
//   plural: 'emails',
// };
// const str = 'MyString {{PASCAL_CASE_ENTITY}} {{PASCAL_CASE_ENTITY_PLURAL}}, ';
//
// const resolver = StringWithEntityCtxResolver.execute(entityName, str);
// console.log('resolver', resolver);
