// https://leetcode.com/problems/shortest-path-in-binary-matrix/

// Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

// A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

// All the visited cells of the path are 0.
// All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
// The length of a clear path is the number of visited cells of this path.

function shortestPathBinaryMatrix(grid: number[][]): number {
  if (grid[0][0] === 1) {
    return -1;
  }

  // instead of check every direction with if
  // we can use array of directions and iterate over it
  function validDirection(row: number, col: number) {
    return 0 <= row && row < n && 0 <= col && col < n && grid[row][col] == 0;
  }
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [0, -1],
    [-1, 0],
  ];

  let answer = 0;
  const n = grid.length;

  const visited: boolean[][] = [];
  for (let i = 0; i < n; i++) {
    visited[i] = new Array(n).fill(false);
  }

  // store indicies and start from top-left cell
  let currLvlVertcies: Array<[number, number]> = [[0, 0]];
  let nextLvlVertices: Array<[number, number]> = [];

  while (currLvlVertcies.length > 0) {
    answer += 1;

    for (let [i, j] of currLvlVertcies) {
      // using BFS, when we meet target vertice - it's guaranted we reach it using the shortest path
      if (i === n - 1 && j === n - 1) {
        return answer;
      }

      for (const [x, y] of directions) {
        let nextRow = i + y,
          nextCol = j + x;

        if (
          validDirection(nextRow, nextCol) &&
          visited[nextRow][nextCol] === false
        ) {
          visited[nextRow][nextCol] = true;
          nextLvlVertices.push([nextRow, nextCol]);
        }
      }

      // // top
      // if (i > 0 && grid[i - 1][j] === 0 && visited[i - 1][j] === false) {
      //   visited[i - 1][j] = true;
      //   nextLvlVertices.push([i - 1, j]);
      // }

      // // top-right
      // if (
      //   i > 0 &&
      //   j < n - 1 &&
      //   grid[i - 1][j + 1] === 0 &&
      //   visited[i - 1][j + 1] === false
      // ) {
      //   visited[i - 1][j + 1] = true;
      //   nextLvlVertices.push([i - 1, j + 1]);
      // }

      // // right
      // if (j < n - 1 && grid[i][j + 1] === 0 && visited[i][j + 1] === false) {
      //   visited[i][j + 1] = true;
      //   nextLvlVertices.push([i, j + 1]);
      // }

      // // bottom-right
      // if (
      //   i < n - 1 &&
      //   j < n - 1 &&
      //   grid[i + 1][j + 1] === 0 &&
      //   visited[i + 1][j + 1] === false
      // ) {
      //   visited[i + 1][j + 1] = true;
      //   nextLvlVertices.push([i + 1, j + 1]);
      // }

      // // bottom
      // if (i < n - 1 && grid[i + 1][j] === 0 && visited[i + 1][j] === false) {
      //   visited[i + 1][j] = true;
      //   nextLvlVertices.push([i + 1, j]);
      // }

      // // bottom-left
      // if (
      //   i < n - 1 &&
      //   j > 0 &&
      //   grid[i + 1][j - 1] === 0 &&
      //   visited[i + 1][j - 1] === false
      // ) {
      //   visited[i + 1][j - 1] = true;
      //   nextLvlVertices.push([i + 1, j - 1]);
      // }

      // // left
      // if (j > 0 && grid[i][j - 1] === 0 && visited[i][j - 1] === false) {
      //   visited[i][j - 1] = true;
      //   nextLvlVertices.push([i, j - 1]);
      // }

      // // top-left
      // if (
      //   i > 0 &&
      //   j > 0 &&
      //   grid[i - 1][j - 1] === 0 &&
      //   visited[i - 1][j - 1] === false
      // ) {
      //   visited[i - 1][j - 1] = true;
      //   nextLvlVertices.push([i - 1, j - 1]);
      // }
    }

    currLvlVertcies = nextLvlVertices;
    nextLvlVertices = [];
  }

  return visited[n - 1][n - 1] ? answer : -1;
}
