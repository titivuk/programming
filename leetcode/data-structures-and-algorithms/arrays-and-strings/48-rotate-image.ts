/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  // 90 degree rotation consists of 2 parts:
  //  - vertical reversal (flip matrix along the horizonstal axis)
  // 1 2 3  ->  7 8 9
  // 4 5 6  ->  4 5 6
  // 7 8 9  ->  1 2 3
  //  - transpose (swap rows and columns)
  // 7 8 9  ->  7 4 1
  // 4 5 6  ->  8 5 2
  // 1 2 3  ->  9 6 3

  const n = matrix.length;

  // vertical reversal
  let top = 0;
  let bot = n - 1;
  while (top < bot) {
    let tmp = 0;
    for (let j = 0; j < n; j++) {
      tmp = matrix[top][j];
      matrix[top][j] = matrix[bot][j];
      matrix[bot][j] = tmp;
    }

    top++;
    bot--;
  }

  // transpose
  for (let i = 0; i < n; i++) {
    let tmp = 0;
    for (let j = i; j < n; j++) {
      tmp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = tmp;
    }
  }
}
