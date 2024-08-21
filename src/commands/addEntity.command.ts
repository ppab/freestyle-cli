import { FileManager } from '../lib/fs-utils/FileManager';
import { readJsonFile } from './readJsonFile.command';
import { writeFileSync } from './writeFileSync.command';
import { strReplaceRegexMatchFromContext } from '../lib/strReplaceRegexMatchFromContext';
import { createEntityTextFormatsCtx } from '../lib/createEntityTextFormatsCtx';

type readFileArgs = {
  key: string;
  filePath: string;
  content: { [key: string]: any };
  ctx?: { [key: string]: any };
  options?:
    | BufferEncoding
    | {
        encoding?: BufferEncoding | null;
        flag?: string;
      };
};

export function addEntity(args: readFileArgs) {
  const { filePath, options, content, key } = args;
  console.log('filePathArgs->', args);
  const { ENTITY_NAME, ENTITY_NAME_PLURAL } = args.ctx;
  const data = readJsonFile(args);
  const entityCtx = createEntityTextFormatsCtx(ENTITY_NAME, ENTITY_NAME_PLURAL);
  console.log('entityCtx', entityCtx);

  const dataWithEntity = { ...data, [entityCtx.KEBAB_CASE_ENTITY]: entityCtx };

  // const resolvedContentCtx = JSON.parse(strReplaceRegexMatchFromContext(JSON.stringify(content), args?.ctx))
  // createEntityTextFormatsCtx(ENTITY_NAME, ENTITY_NAME_PLURAL)
  // console.log("resolvedContentCtx", resolvedContentCtx)
  const mergedData = { ...dataWithEntity };
  writeFileSync({ ...args, content: mergedData });

  const fileManager = FileManager.sync();
  return fileManager.read(filePath, options);
}
