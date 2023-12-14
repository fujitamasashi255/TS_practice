import fs from 'fs';
import url from "node:url";
import path from "node:path";
const regex = /uhyo/g;
const source_path = url.fileURLToPath(import.meta.url);
const target_path = `${path.dirname(source_path)}/../../doc/uhyo.txt`;
fs.readFile(target_path, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        const uhyo_count = data.match(regex)?.length;
        console.log(uhyo_count);
    }
});
console.log("確認用");
console.log(import.meta.url);
console.log(url.fileURLToPath(import.meta.url));
console.log(path.dirname(url.fileURLToPath(import.meta.url)));
