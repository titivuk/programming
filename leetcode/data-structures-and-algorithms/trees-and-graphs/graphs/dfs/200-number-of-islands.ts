import { strictEqual } from "assert";

// https://leetcode.com/problems/number-of-islands/

function numIslands(grid: string[][]): number {
  let answer = 0;
  let m = grid.length,
    n = grid[0].length;

  const visited: boolean[][] = [];
  for (let i = 0; i < m; i++) {
    visited[i] = [];

    for (let j = 0; j < n; j++) {
      visited[i].push(false);
    }
  }

  function dfs(i: number, j: number) {
    // mark visited island
    visited[i][j] = true;

    // check all cells that are islands and connected to the current island

    // top
    if (i > 0 && grid[i - 1][j] === "1" && visited[i - 1][j] === false) {
      dfs(i - 1, j);
    }

    // right
    if (j < n - 1 && grid[i][j + 1] === "1" && visited[i][j + 1] === false) {
      dfs(i, j + 1);
    }

    // bottom
    if (i < m - 1 && grid[i + 1][j] === "1" && visited[i + 1][j] === false) {
      dfs(i + 1, j);
    }

    // left
    if (j > 0 && grid[i][j - 1] === "1" && visited[i][j - 1] === false) {
      dfs(i, j - 1);
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // if cell is island and not yet visited
      // we found previous unseen island / group of connected islands
      if (grid[i][j] === "1" && visited[i][j] === false) {
        // so we increment answer
        answer += 1;
        // and visit connected islands
        dfs(i, j);
      }
    }
  }

  return answer;
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
