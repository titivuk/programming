// https://leetcode.com/problems/island-perimeter/

function islandPerimeter(grid: number[][]): number {
  let rows = grid.length,
    cols = grid[0].length;

  let visited: boolean[][] = [];
  for (let i = 0; i < rows; i++) {
    visited[i] = new Array(cols).fill(false);
  }

  let directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  function isValidDirection(i: number, j: number) {
    return i >= 0 && i < rows && j >= 0 && j < cols && grid[i][j] === 1;
  }

  // dfs
  function dfs(i: number, j: number): number {
    // mark visited island
    visited[i][j] = true;

    // by default cell perimeter = 4
    // but every neighbor takes edge
    // so we decrement perimeter every time we meet neighbor cell
    let perimeter = 4;

    // check all adjacent cells
    for (const dir of directions) {
      let nextRow = i + dir[0],
        nextCol = j + dir[1];

      if (isValidDirection(nextRow, nextCol)) {
        perimeter -= 1;

        if (visited[nextRow][nextCol] === false) {
          perimeter += dfs(nextRow, nextCol);
        }
      }
    }

    return perimeter;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        return dfs(i, j);
      }
    }
  }

  return 0;
}

islandPerimeter([
  [1, 1],
  [1, 1],
]);
