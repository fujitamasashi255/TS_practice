export{}

type Option<T> = {
  type: "some";
  value: T;
} | {
  type: "none";
}

function isSome<T>(obj: Option<T>): obj is Extract<Option<T>, { type: "some" }> {
  return obj.type === "some"
}

function showNumberIfExists(obj: Option<number>) {
  if(isSome(obj)){
    console.log(obj.value)
  }
}

const obj: Option<number> = {
  type: "some",
  value: 100,
}

showNumberIfExists(obj)