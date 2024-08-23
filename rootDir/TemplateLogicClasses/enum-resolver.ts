import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { TextFormatGenerator } from '../../src/lib/text-format-generator';
import { createEntityTextFormatsCtx } from '../../src/lib/createEntityTextFormatsCtx';
import { ResolverBaseClass } from './resolver-base-class';
import path from 'path';

export class EnumResolver extends ResolverBaseClass {
  contentDestinationTemplateString: string = `
    export enum {{ENUM_NAME}} {
    {{ENUM_ITEMS}}
    }
    `;

  createEnumItems(values) {
    const items = values.map((item) => `${item} = '${item}'`);
    return items.join(',\n');
  }

  finalizeCtx({ name, value }) {
    this.addToCtx('ENUM_NAME', name);
    this.addToCtx(
      'ENUM_NAME_KEBAB_CASE',
      TextFormatGenerator.FromPascalCase(name).KEBAB_CASE,
    );
    this.addToCtx('ENUM_ITEMS', this.createEnumItems(value));
  }

  execute() {
    if (this.schema.enums.length > 0) {
      this.schema.enums.forEach((enumConfig) => {
        enumConfig.paths.forEach((path) => {
          this.setContentDestinationPath(path);
          this.addEntityFormatsToCtx();
          this.finalizeCtx({ name: enumConfig.name, value: enumConfig.values });
          this.createFile();
        });
      });
    }
    console.log('No enums defined, skipping file creation');
  }

  static create(schema) {
    const resolver = new EnumResolver();
    resolver.setSchema(schema);
    resolver.execute();
  }
}
