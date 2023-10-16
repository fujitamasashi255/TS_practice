type Some<T> = {
  type: "some";
  value: T;
}

type None<T> = {
  type: "none"
}

type Option<T> = Some<T> | None<T>

function isSome<T>(obj: Option<T>): obj is Some<T> {
  return obj.type === "some"
}

function mapOption<T, U>(obj: Option<T>, callback: (value: T) => U): Option<U> {
  if(isSome(obj)){
    return { type: "some", value: callback(obj.value) }
  }
  return { type: "none" }
}

function doubleOption(obj: Option<number>) {
  return mapOption(obj, x => x * 2)
}

const four: Option<number> = { type: "some", value: 4 }
const nothing: Option<number> = { type: "none" }

console.log(doubleOption(four))
console.log(doubleOption(nothing))