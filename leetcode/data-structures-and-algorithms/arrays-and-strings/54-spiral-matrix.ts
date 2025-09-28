function spiralOrder(matrix: number[][]): number[] {
  // indices of borders
  let top = 0;
  let bot = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  const result = [];
  while (top <= bot && left <= right) {
    // top
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }

    // right
    for (let i = top + 1; i < bot; i++) {
      result.push(matrix[i][right]);
    }

    if (top < bot) {
      // bottom
      for (let i = right; i >= left; i--) {
        result.push(matrix[bot][i]);
      }
    }

    // left
    if (left < right) {
      for (let i = bot - 1; i >= top + 1; i--) {
        result.push(matrix[i][left]);
      }
    }

    top++;
    bot--;
    left++;
    right--;
  }

  return result;
}
