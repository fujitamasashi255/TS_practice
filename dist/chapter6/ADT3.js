"use strict";
function isSome(obj) {
    return obj.type === "some";
}
function mapOption(obj, callback) {
    if (isSome(obj)) {
        return { type: "some", value: callback(obj.value) };
    }
    return { type: "none" };
}
function doubleOption(obj) {
    return mapOption(obj, x => x * 2);
}
const four = { type: "some", value: 4 };
const nothing = { type: "none" };
console.log(doubleOption(four));
console.log(doubleOption(nothing));
