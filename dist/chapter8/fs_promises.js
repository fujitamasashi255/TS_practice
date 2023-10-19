import { readFile } from "fs/promises";
import { uhyoFilePath } from "../helper/file_helper.js";
const readfile_pro = () => {
    return readFile(uhyoFilePath, 'utf8');
};
const timeout_pro = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("1ms経過"));
        }, 1);
    });
};
/*
上記関数は次でもOK
const timeout_pro = async () => {
  await setTimeout(() => {}, 1)
  throw new Error
}
*/
const content = "";
try {
    const content = await Promise.race([readfile_pro(), timeout_pro()]);
}
catch (err) {
    console.log(err);
}
const regex = /uhyo/g;
console.log(`読み込み結果：${content}`);
console.log([].length);
console.log(content.match(regex));
const uhyo_count = content.match(regex)?.length;
console.log(uhyo_count);
