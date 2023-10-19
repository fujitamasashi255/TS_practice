import { readFile } from "fs/promises";
import { uhyoFilePath } from "../helper/file_helper.js";
const regex = /uhyo/g;
const pro = readFile(uhyoFilePath, 'utf8');
pro.then((content) => {
    const uhyo_count = content.match(regex)?.length;
    console.log(uhyo_count);
}).catch((err) => {
    console.log(err);
});
