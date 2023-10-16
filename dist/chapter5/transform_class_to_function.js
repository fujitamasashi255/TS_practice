function createUser(name, age) {
    return (message) => {
        return `${name} (${age})「${message}」`;
    };
}
const func = createUser("masashi", 35);
console.log(func("おはよー"));
export {};
