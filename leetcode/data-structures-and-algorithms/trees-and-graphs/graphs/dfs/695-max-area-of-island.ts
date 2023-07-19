// https://leetcode.com/problems/max-area-of-island/description/

// You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
// The area of an island is the number of cells with a value 1 in the island.
// Return the maximum area of an island in grid. If there is no island, return 0.

// similar to 200
function maxAreaOfIsland(grid: number[][]): number {
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

    let answ = 1;

    // check all cells that are islands and connected to the current island

    // top
    if (i > 0 && grid[i - 1][j] === 1 && visited[i - 1][j] === false) {
      answ += dfs(i - 1, j);
    }

    // right
    if (j < n - 1 && grid[i][j + 1] === 1 && visited[i][j + 1] === false) {
      answ += dfs(i, j + 1);
    }

    // bottom
    if (i < m - 1 && grid[i + 1][j] === 1 && visited[i + 1][j] === false) {
      answ += dfs(i + 1, j);
    }

    // left
    if (j > 0 && grid[i][j - 1] === 1 && visited[i][j - 1] === false) {
      answ += dfs(i, j - 1);
    }

    return answ;
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // if cell is island and not yet visited
      // we found previous unseen island / group of connected islands
      if (grid[i][j] === 1 && visited[i][j] === false) {
        // and visit connected islands
        answer = Math.max(answer, dfs(i, j));
      }
    }
  }

  return answer;
}
