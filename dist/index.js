"use strict";
function isPropertyAccessible(value) {
    return value != null;
}
function isHuman(value) {
    // 以下はダメ.「{ }のときnameプロパティにアクセスできません」になる
    // if(value == null) return false
    if (!isPropertyAccessible(value))
        return false;
    return (typeof value.name === "string" && typeof value.age === "number");
}
const getName = (animal) => {
    if (isHuman(animal))
        return animal.name;
    return "NoName";
};
const human = { name: "masa", age: 10 };
const str = getName(human);
console.log(str);
