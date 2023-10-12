"use strict";
const data = `
uhyo,26,1
John Smith,17,0
Mary Sue,14,1
`;
const users = userCsvParse(data).map(row => {
    return {
        name: row[0],
        age: row[1],
        premiumUser: row[2]
    };
});
for (const user of users) {
    if (user.premiumUser) {
        console.log(`${user.name}(${user.age}はプレミアムユーザーです。)`);
    }
    else {
        console.log(`${user.name}(${user.age}はプレミアムユーザーではありません。)`);
    }
}
function userCsvParse(csvStr) {
    const rowStrs = csvStr.split(/\n/);
    return rowStrs.filter(str => str !== "").map(rowStr => userCsvRowParse(rowStr));
}
function userCsvRowParse(csvRowStr) {
    const rowStrs = csvRowStr.split(',');
    return [rowStrs[0], Number(rowStrs[1]), rowStrs[2] === "1"];
}
