class User {
    constructor(name, age) {
        if (name === '') {
            throw new Error("名前は空にできません！");
        }
        this.name = name;
        this.age = age;
    }
    getMessage(message) {
        return `${this.name} (${this.age})「${message}」`;
    }
}
const uhyo = new User("uhyo", 22);
console.log(uhyo.getMessage("こんにちは"));
export {};
