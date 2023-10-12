type Human = {
  name: string;
  age: number;
}

type Animal = {
  age: number;
}

function isPropertyAccessible(value: unknown): value is { [key: string]: unknown } {
  return value != null
}

function isHuman(value: unknown): value is Human {
  // 以下はダメ.「{ }のときnameプロパティにアクセスできません」になる
  // if(value == null) return false
  if(!isPropertyAccessible(value)) return false;
  return (
    typeof value.name === "string" && typeof value.age === "number"
  )
}

const getName = (animal: Animal): string => {
  if(isHuman(animal)) return animal.name;
  return "NoName";
}

const human: Human = { name: "masa", age: 10 }
const str = getName(human)
console.log(str)
