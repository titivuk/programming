// https://leetcode.com/problems/rotting-oranges/

function orangesRotting(grid: number[][]): number {
  const directions = [
    [-1, 0], // top
    [0, 1], // left
    [1, 0], // bottom
    [0, -1], //right
  ];

  function isValidDirection(i: number, j: number) {
    return (
      i >= 0 &&
      i < grid.length &&
      j >= 0 &&
      j < grid[i].length &&
      grid[i][j] === 1
    );
  }

  let currLvlVertices: number[][] = [],
    nextLvlVertices: number[][] = [];

  // start from all rotten oranges at the same time
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 2) {
        currLvlVertices.push([i, j]);
      }
    }
  }

  let mins = 0;
  // basically each iteration equal to 1 min period
  // every rotten orange makes adjacent fresh oranges rotten in parallel
  while (currLvlVertices.length > 0) {
    for (const [i, j] of currLvlVertices) {
      for (const dir of directions) {
        let nextRow = i + dir[0],
          nextCol = j + dir[1];

        if (isValidDirection(nextRow, nextCol)) {
          // make orange rotten
          grid[nextRow][nextCol] = 2;

          nextLvlVertices.push([nextRow, nextCol]);
        }
      }
    }

    currLvlVertices = nextLvlVertices;
    nextLvlVertices = [];

    // if we have oranges that became rotten
    // we add a minute
    // for example, we can have [[0, 2]] grid.
    // In this case we will have single iteration, but there is no oranges that can become rotten
    // so no need to add a minute
    if (currLvlVertices.length > 0) {
      mins += 1;
    }
  }

  // if there is at least one fresh orange - it's not possible to make it rotten
  // return -1
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        return -1;
      }
    }
  }

  return mins;
}

orangesRotting([
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1],
]);
