function isSome(obj) {
    return obj.type === "some";
}
function showNumberIfExists(obj) {
    if (isSome(obj)) {
        console.log(obj.value);
    }
}
const obj = {
    type: "some",
    value: 100,
};
showNumberIfExists(obj);
export {};
