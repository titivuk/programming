class Matrix {
  private matrix = [
    [1, 2, 3],
    [4, 5, 6],
  ];

  [Symbol.iterator]() {
    let i = 0,
      j = 0;

    return {
      next: () => {
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

        return {
          done: false,
          value,
        };
      },
    };
  }
}

const matrix = new Matrix();

for (const item of matrix) {
  console.log(item);
}
