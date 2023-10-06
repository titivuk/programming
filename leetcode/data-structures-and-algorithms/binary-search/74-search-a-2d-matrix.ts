// https://leetcode.com/problems/search-a-2d-matrix/description/

function searchMatrix(matrix: number[][], target: number): boolean {
  let m = matrix.length;
  let n = matrix[0].length;

  let left = 0,
    right = m * n - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let row = Math.floor(mid / n);
    let col = mid % n;

    if (target === matrix[row][col]) {
      return true;
    }

    if (target < matrix[row][col]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return false;
}

searchMatrix(
  [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 50],
  ],
  16
);
