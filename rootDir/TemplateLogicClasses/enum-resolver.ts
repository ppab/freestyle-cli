import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { TextFormatGenerator } from '../../src/lib/text-format-generator';
import { createEntityTextFormatsCtx } from '../../src/lib/createEntityTextFormatsCtx';

export class EnumResolver {
  contentDestinationTemplateString: string = `
    export enum {{ENUM_NAME}} {
    {{ENUM_ITEMS}}
    }
    `;
  ctx: { [key: string]: string } | {} = {};

  constructor(private readonly enumConfig) {
    this.enumConfig = enumConfig;
  }

  addEntityFormatsToCtx(entity, entityPlural) {
    console.log('addEntityToScema', arguments);
    const obj = createEntityTextFormatsCtx(entity, entityPlural);
    this.ctx = { ...this.ctx, ...obj };
  }

  finalizeCtx() {
    this.addToCtx('ENUM_NAME', this.enumConfig.name);
    this.addToCtx(
      'ENUM_NAME_KEBAB_CASE',
      TextFormatGenerator.FromPascalCase(this.enumConfig.name).KEBAB_CASE,
    );
    this.addToCtx('ENUM_ITEMS', this.createEnumItems(this.enumConfig.values));
  }

  createEnumItems(values) {
    const items = values.map((item) => `${item} = '${item}'`);
    return items.join(',\n');
  }

  addToCtx(key, value) {
    this.ctx[key] = value;
  }

  createFile() {
    this.enumConfig.paths.forEach((path) => {
      createFileWithCtxContent({
        contentDestination: {
          path: path,
        },
        contentSource: this.contentDestinationTemplateString,
        ctx: this.ctx,
      });
    });
  }

  static createMultiple(enums, entity, entityPlural) {
    console.log('Resolving Enums->');
    if (!Array.isArray(enums)) {
      throw Error(`Enums must be an array`);
    }
    if (enums.length > 0) {
      enums.forEach((item) => {
        EnumResolver.create(item, entity, entityPlural);
      });
    }
  }

  static create(item, entity, entityPlural) {
    const resolver = new EnumResolver(item);
    resolver.addEntityFormatsToCtx(entity, entityPlural);
    resolver.finalizeCtx();
    resolver.createFile();
  }
}
