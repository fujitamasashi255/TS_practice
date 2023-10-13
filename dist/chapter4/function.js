"use strict";
function getFizzBuzzString(i) {
    if (i % 3 === 0 && i % 5 === 0)
        return "FizzBuzz";
    if (i % 3 === 0)
        return "Fizz";
    if (i % 5 === 0)
        return "Buzz";
    return i;
}
function sequence(start, end) {
    const res = [];
    let i = start;
    while (i <= end) {
        res.push(i);
        i++;
    }
    return res;
}
for (const i of sequence(1, 100)) {
    const message = getFizzBuzzString(i);
    console.log(message);
}
