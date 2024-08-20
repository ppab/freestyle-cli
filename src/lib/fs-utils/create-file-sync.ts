import fs from 'fs';

export function createFileSync(filePath: string, content: string) {
  try {
    fs.writeFileSync(filePath, content.trim());
    console.log(`file '${filePath}' created`);
  } catch (err) {
    throw err;
  }
}
