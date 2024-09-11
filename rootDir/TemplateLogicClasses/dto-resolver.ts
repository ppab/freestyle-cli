import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { TextFormatGenerator } from '../../src/lib/text-format-generator';
import { createEntityTextFormatsCtx } from '../../src/lib/createEntityTextFormatsCtx';
import { DTO_Config_Interface } from '../../src/types/global';
import { ResolverBaseClass } from './resolver-base-class';

export class DtoResolver extends ResolverBaseClass {
  contentDestinationTemplateString: string = `
  import { {{DTO_DECORATORS_IMPORT}} } from 'class-validator';
  
  {{DTO_OTHER_IMPORTS_JOIN}}
  
  export class Create{{DTO_CLASS_NAME}} {
    {{DTO_FIELDS_CONTENT}}
  }
    `;

  otherImports = [];
  classTransformerImports: ClassTransformers[] = [];
  decoratorsSet = new Set<DtoDecoratorType>();
  items: DTO_Config_Interface[] = [];

  addToItems(value: DTO_Config_Interface) {
    this.items.push(value);
  }

  processArgument(args) {
    this.addToItems(args.dto.create);
  }

  addDecoratorsToSet() {
    this.items?.map((field) => {
      field.decorators.forEach((decorator: DtoDecoratorType) => {
        if (typeof decorator !== 'string') {
          if (decorator[0] === 'Type') return;
          return this.decoratorsSet.add(decorator[0]);
        }
        return this.decoratorsSet.add(decorator);
      });
    });
  }

  buildDtoImport(dtoName: string, path?: string | undefined) {
    const pathFormats = new TextFormatGenerator(dtoName).generateFormats();

    const defaultPath = `./${pathFormats.KEBAB_CASE}.dto`;
    return `import { ${dtoName} } from "${path || defaultPath}";`;
  }

  buildEnumImport(enumName: string, path?: string | undefined) {
    const enumNameFormats = new TextFormatGenerator(enumName).generateFormats();
    const defaultPath = `../enums/${enumNameFormats.PASCAL_CASE}.enum`;
    return `import { ${enumName} } from "${path || defaultPath}";`;
  }

  resolveDecorators() {
    const fieldsContent = this.items.map((field: DTO_Config_Interface) => {
      const decorators = field.decorators
        .map((decorator: DtoDecoratorType) => {
          if (typeof decorator === 'string') return `@${decorator}()`;

          const [decoratorName, decoratorArguments] = decorator;

          if (decoratorName === 'Type') {
            this.otherImports.push(
              this.buildDtoImport(
                decoratorArguments.args,
                decoratorArguments.path,
              ),
            );
            if (!this.classTransformerImports.includes(decoratorName)) {
              this.classTransformerImports.push(decoratorName);
            }
            return `@${decoratorName}(() => ${decoratorArguments.args})`;
          }
          if (decoratorName === 'IsEnum') {
            this.otherImports.push(
              this.buildEnumImport(
                decoratorArguments.args,
                decoratorArguments.path,
              ),
            );
          }
          return `@${decoratorName}(${decoratorArguments.args})`;
        })
        .join('\n  ');
      return `  ${decorators}\n  ${field.key}: ${field.type};`;
    });
    console.log('fieldsContent-->>>', fieldsContent);

    this.addToCtx('DTO_FIELDS_CONTENT', fieldsContent.join('\n\n'));
  }

  resolveClassTransformerImports(
    classTransformerImports: ClassTransformers[],
    otherImports: string[],
  ) {
    if (classTransformerImports.length > 0) {
      otherImports.push(
        `import { ${classTransformerImports.join(',')} } from 'class-transformer';`,
      );
    }
  }

  finalizeCtx() {
    const decoratorsImport = Array.from(this.decoratorsSet).join(', ');

    this.addToCtx('DTO_DECORATORS_IMPORT', decoratorsImport); //OK!!!

    this.resolveClassTransformerImports(
      this.classTransformerImports,
      this.otherImports,
    );

    const whiteSpace = ' ';
    const otherImportsJoin =
      this.otherImports.length > 0 ? this.otherImports.join('\n') : whiteSpace;

    this.addToCtx('DTO_OTHER_IMPORTS_JOIN', otherImportsJoin);

    this.addToCtx(
      'DTO_CLASS_NAME',
      `${this.entityTextFormats.PASCAL_CASE_ENTITY}Dto`,
    );
  }

  addToCtx(key, value) {
    this.ctx[key] = value;
  }

  execute() {
    this.addEntityFormatsToCtx();
    this.addDecoratorsToSet();
    this.resolveDecorators();
    this.finalizeCtx();
    this.schema.dto.forEach((dtoConfig) => {
      dtoConfig.paths.forEach((path) => {
        this.setContentDestinationPath(path);
        this.createFile();
      });
    });
  }
}
