import { createFileWithCtxContent } from '../../src/commands/createFileWithCtx.command';
import { createEntityContext } from '../../src/lib/createEntityContext';

export class BackendSystemInputListResolver {
  contentDestinationTemplateString: string = `
  {{SYSTEM_INPUTS_IMPORTS}}
  export const systemInputs=[
   {{SYSTEM_INPUTS_LIST}}
  ]
 
    `;
  private readonly contentDestinationPath: string =
    './rootDir/dist/backend/system-inputs/system-inputs.index.ts';

  ctx: { [key: string]: string } | {} = {};
  systemInputsImports = [];
  systemInputsList = [];

  addImport(entity, entityPlural) {
    const ctx = createEntityContext(entity, entityPlural);
    const sImport = `import { SI${ctx.PASCAL_CASE_ENTITY} } from './${ctx.PASCAL_CASE_ENTITY_PLURAL}'`;
    const sListItem = `SI${ctx.PASCAL_CASE_ENTITY}`;
    this.systemInputsImports.push(sImport);
    this.systemInputsList.push(sListItem);
  }

  finalizeCtx() {
    this.addToCtx(
      'SYSTEM_INPUTS_IMPORTS',
      this.systemInputsImports.join(' \n'),
    );
    this.addToCtx('SYSTEM_INPUTS_LIST', this.systemInputsList.join(', \n'));
  }

  addToCtx(key, value) {
    this.ctx[key] = value;
  }

  createFile() {
    createFileWithCtxContent({
      contentDestination: {
        path: this.contentDestinationPath,
      },
      contentSource: this.contentDestinationTemplateString,
      ctx: this.ctx,
    });
  }
}
