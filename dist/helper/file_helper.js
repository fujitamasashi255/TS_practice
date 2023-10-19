import url from "node:url";
import path from "node:path";
// /app/dist/helper/file_helper.js
const currentFilePath = url.fileURLToPath(import.meta.url);
// /app/dist/helper
const currentDirPath = path.dirname(currentFilePath);
// app/doc/
const docDirPath = path.resolve(currentDirPath, '../../doc');
export const uhyoFilePath = path.resolve(docDirPath, 'uhyo.txt');
