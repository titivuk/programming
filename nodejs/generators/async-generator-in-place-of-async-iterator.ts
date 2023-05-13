export {};

class Matrix {
  private matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  // generator
  async *[Symbol.asyncIterator]() {
    // these state variables a local
    // because iterator preserves state between reentries
    let i = 0,
      j = 0;

    while (i !== this.matrix.length) {
      // there can be any awaited operation
      const value = await Promise.resolve(this.matrix[i][j]);

      yield value;

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

for await (const item of matrix) {
  console.log("iterable protocol", item);
}

const iterator = matrix[Symbol.asyncIterator]();

let iterationResult = await iterator.next();
while (!iterationResult.done) {
  console.log("iterator protocol", iterationResult.value);
  iterationResult = await iterator.next();
}
