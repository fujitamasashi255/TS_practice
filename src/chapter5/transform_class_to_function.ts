export{}

function createUser(name: string, age: number): (message: string) => string {
  return (message: string): string => {
    return `${name} (${age})「${message}」`
  }
}

const func = createUser("masashi", 35)
console.log(func("おはよー"))