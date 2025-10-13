// https://leetcode.com/problems/rotting-oranges/

const dirs = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], //  left
];

function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  let currLvlVertices: number[][] = [];
  let nextLvlVertices: number[][] = [];

  // find starting points, ie rotten tomatoes
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        currLvlVertices.push([i, j]);
      }
    }
  }

  let steps = 0;
  // basically each iteration equal to 1 min period
  // every rotten orange make adjacent fresh oranges rotten in parallel
  while (currLvlVertices.length > 0) {
    for (const [i, j] of currLvlVertices) {
      for (const [di, dj] of dirs) {
        const nexti = i + di;
        const nextj = j + dj;

        if (isValid(nexti, nextj, m, n) && grid[nexti][nextj] === 1) {
          grid[nexti][nextj] = 2;
          nextLvlVertices.push([nexti, nextj]);
        }
      }
    }

    currLvlVertices = nextLvlVertices;
    nextLvlVertices = [];

    if (currLvlVertices.length > 0) {
      steps += 1;
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // unreachable fresh orange
      if (grid[i][j] === 1) {
        return -1;
      }
    }
  }

  return steps;
}

function isValid(i: number, j: number, m: number, n: number): boolean {
  return 0 <= i && i < m && 0 <= j && j < n;
}

orangesRotting([
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1],
]);

export {};
