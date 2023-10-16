function map(array, callback) {
    const result = [];
    for (const elem of array) {
        result.push(callback(elem));
    }
    return result;
}
const data = [1, 1, 2, 3, 5, 8, 13];
const result = map(data, (x) => x * 10);
console.log(result);
export {};
