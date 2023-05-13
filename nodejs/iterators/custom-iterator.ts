const A_CHAR_CODE = 65;
const Z_CHAR_CODE = 90;

function createAlphabetIterator() {
  let currentCharCode = A_CHAR_CODE;

  return {
    next() {
      if (currentCharCode > Z_CHAR_CODE) {
        return { done: true };
      }

      const char = String.fromCharCode(currentCharCode);
      currentCharCode++;

      return {
        done: false,
        value: char,
      };
    },
  };
}

const iterator = createAlphabetIterator();

let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.log("iterator protocol", iterationResult.value);
  iterationResult = iterator.next();
}

export {};
