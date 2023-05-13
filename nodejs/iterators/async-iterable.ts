class Matrix {
  private matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  [Symbol.asyncIterator]() {
    let i = 0,
      j = 0;

    return {
      next: async () => {
        if (i === this.matrix.length) {
          return { done: true };
        }

        const value = this.matrix[i][j];

        if (j === this.matrix[i].length - 1) {
          i++;
          j = 0;
        } else {
          j++;
        }

        // there can be any awaited operation
        await Promise.resolve(5);

        return {
          done: false,
          value,
        };
      },
    };
  }
}

const matrix = new Matrix();

/**
 * use builtins
 */
for await (const item of matrix) {
  console.log("iterable protocol", item);
}

/**
 * get iterator
 */
const iterator = matrix[Symbol.asyncIterator]();

let iterationResult = await iterator.next();
while (!iterationResult.done) {
  console.log("iterator protocol", iterationResult.value);
  iterationResult = await iterator.next();
}

export {};
