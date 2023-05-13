export {};

class Matrix {
  private matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  // generator
  *[Symbol.iterator]() {
    // these state variables a local
    // because iterator preserves state between reentries
    let i = 0,
      j = 0;

    while (i !== this.matrix.length) {
      yield this.matrix[i][j];

      if (j === this.matrix[i].length - 1) {
        i++;
        j = 0;
      } else {
        j++;
      }
    }
  }
}

const matrix = new Matrix();

for (const item of matrix) {
  console.log("iterable protocol", item);
}

const iterator = matrix[Symbol.iterator]();

let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.log("iterator protocol", iterationResult.value);
  iterationResult = iterator.next();
}
