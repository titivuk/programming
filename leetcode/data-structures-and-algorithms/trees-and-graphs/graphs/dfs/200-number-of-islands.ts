import { strictEqual } from "assert";

// https://leetcode.com/problems/number-of-islands/

const dirs = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], //  left
];

function numIslands(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  let islands = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        grid[i][j] = "0"; // instead of separate "seen" matrix, just mark visited cells as water
        dfs(grid, i, j);
        islands += 1;
      }
    }
  }

  return islands;
}

function dfs(grid: string[][], i: number, j: number) {
  const m = grid.length;
  const n = grid[0].length;

  for (const d of dirs) {
    const nexti = i + d[0];
    const nextj = j + d[1];

    if (isValid(nexti, nextj, m, n) && grid[nexti][nextj] === "1") {
      grid[nexti][nextj] = "0"; // instead of separate "seen" matrix, just mark visited cells as water
      dfs(grid, nexti, nextj);
    }
  }
}

function isValid(i: number, j: number, m: number, n: number): boolean {
  return 0 <= i && i < m && 0 <= j && j < n;
}

strictEqual(
  numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ]),
  1
);

strictEqual(
  numIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ]),
  3
);

strictEqual(
  numIslands([
    ["0", "1", "0"],
    ["1", "0", "1"],
    ["0", "1", "0"],
  ]),
  4
);
