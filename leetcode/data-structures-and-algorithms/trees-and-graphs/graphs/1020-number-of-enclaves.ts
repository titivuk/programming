// https://leetcode.com/problems/number-of-enclaves/

function numEnclaves(grid: number[][]): number {
  let rows = grid.length,
    cols = grid[0].length;

  let visited: boolean[][] = [];
  for (let i = 0; i < rows; i++) {
    visited[i] = new Array(cols).fill(false);
  }

  let directions = [
    [-1, 0], // top
    [0, 1], // right
    [1, 0], // bottom
    [0, -1], // left
  ];
  function isValidDirection(i: number, j: number) {
    return i >= 0 && i < rows && j >= 0 && j < cols && grid[i][j] === 1;
  }

  function dfs(i: number, j: number): number {
    visited[i][j] = true;

    // current cell counted by default
    let cells = 1;
    let nextRow = 0,
      nextCol = 0;

    let touchesBoundary = false;
    // move to every connected cell
    for (const [row, col] of directions) {
      nextRow = i + row;
      nextCol = j + col;

      if (
        isValidDirection(nextRow, nextCol) &&
        visited[nextRow][nextCol] === false
      ) {
        // calculate area of connected cells
        let neighborArea = dfs(nextRow, nextCol);

        // if one of the neigbors returned 0
        // then it touches the grid edge somewhere
        if (neighborArea === 0) {
          touchesBoundary = true;
        }

        cells += neighborArea;
      }
    }

    // check if on the edge
    // there are 2 possible cases
    //  * current cell is on the edge
    //  * one of the connected and visited cells is on the edge
    if (
      touchesBoundary ||
      i === 0 ||
      i === rows - 1 ||
      j === 0 ||
      j === cols - 1
    ) {
      return 0;
    }

    return cells;
  }

  let answer = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1 && visited[i][j] === false) {
        // if cell or group of connected cells does not "touch" the edge
        // then dfs returns number of cells
        // else it return 0
        answer += dfs(i, j);
      }
    }
  }

  return answer;
}

/**
 * Solution consists of 2 parts
 *  1. traverse grid starting from the cells on the edge of the grid and set value = 0
 *  2. when traverse is done, iterate over every grid and count number of cells with value = 1
 *    if grid[i][j] = 1 it means that that cell is not reachable from the edge of the grid
 */
function numEnclaves_CheckEdgeCells(grid: number[][]): number {
  let rows = grid.length,
    cols = grid[0].length;

  let directions = [
    [-1, 0], // top
    [0, 1], // right
    [1, 0], // bottom
    [0, -1], // left
  ];
  function isValidDirection(i: number, j: number) {
    return i >= 0 && i < rows && j >= 0 && j < cols && grid[i][j] === 1;
  }

  function dfs(i: number, j: number) {
    // instead of having visited matrix, just change value of visited cells to 0
    grid[i][j] = 0;

    let nextRow = 0,
      nextCol = 0;

    // move to every connected cell
    for (const [row, col] of directions) {
      nextRow = i + row;
      nextCol = j + col;

      if (isValidDirection(nextRow, nextCol)) {
        dfs(nextRow, nextCol);
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (
        // check if the cell is on the edge
        (i * j === 0 || j === cols - 1 || i === rows - 1) &&
        grid[i][j] === 1
      ) {
        dfs(i, j);
      }
    }
  }

  let answer = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // if cell value = 1 - it's not reachable from the edge of the grid
      if (grid[i][j] === 1) {
        answer += 1;
      }
    }
  }

  return answer;
}

numEnclaves_CheckEdgeCells([
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
]);
