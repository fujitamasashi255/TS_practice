"use strict";
const double = (num) => {
    if (num === undefined) {
        return 0;
    }
    else {
        return num * 2;
    }
};
console.log(double(undefined));
console.log(double(123));
console.log("aa".repeat(2));
