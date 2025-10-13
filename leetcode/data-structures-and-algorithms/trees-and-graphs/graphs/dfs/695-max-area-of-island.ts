// https://leetcode.com/problems/max-area-of-island/description/

// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
// The area of an island is the number of cells with a value 1 in the island.
// Return the maximum area of an island in grid. If there is no island, return 0.

// similar to 200
const dirs = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], //  left
];

function maxAreaOfIsland(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  let maxArea = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        grid[i][j] = 0; // instead of separate "seen" matrix, just mark visited cells as water
        maxArea = Math.max(maxArea, dfs(grid, i, j));
      }
    }
  }

  return maxArea;
}

function dfs(grid: number[][], i: number, j: number): number {
  const m = grid.length;
  const n = grid[0].length;

  let area = 1;
  for (const d of dirs) {
    const nexti = i + d[0];
    const nextj = j + d[1];

    if (isValid(nexti, nextj, m, n) && grid[nexti][nextj] === 1) {
      grid[nexti][nextj] = 0; // instead of separate "seen" matrix, just mark visited cells as water
      area += dfs(grid, nexti, nextj);
    }
  }

  return area;
}

function isValid(i: number, j: number, m: number, n: number): boolean {
  return 0 <= i && i < m && 0 <= j && j < n;
}
