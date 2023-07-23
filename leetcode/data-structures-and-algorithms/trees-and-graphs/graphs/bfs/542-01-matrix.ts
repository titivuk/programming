// https://leetcode.com/problems/01-matrix/
// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
// The distance between two adjacent cells is 1.

function updateMatrix(mat: number[][]): number[][] {
  // rows
  const m = mat.length;
  // columns
  const n = mat[0].length;
  const answer: number[][] = [];

  const visited: boolean[][] = [];
  for (let i = 0; i < m; i++) {
    visited[i] = new Array(n).fill(false);
    answer[i] = new Array(n).fill(0);
  }

  function validDirection(i: number, j: number) {
    return i >= 0 && i < m && j >= 0 && j < n && mat[i][j] === 1;
  }

  const directions: Array<[number, number]> = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  // regular BFS but we start from all Zeroes
  let currentLvlVertices: Array<[number, number]> = [];
  let nextLvlVertices: Array<[number, number]> = [];

  // find all zeroes and push them to the currentLvlVertices
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        currentLvlVertices.push([i, j]);
        visited[i][j] = true;
      }
    }
  }

  // we use BFS shortest path property
  // if we find mat[x][y] == 1 -> distance == shorted path to the nearest 0 (see README.md)
  let distance = 0;
  while (currentLvlVertices.length > 0) {
    for (let i = 0; i < currentLvlVertices.length; i++) {
      let x = currentLvlVertices[i][0],
        y = currentLvlVertices[i][1];

      // 1 is found -> distance == shorted path to the nearest 0 vertice
      if (mat[x][y] === 1) {
        answer[x][y] = distance;
      }

      // enqueue adjacent vertices for the next BFS iteration
      for (const [a, b] of directions) {
        if (validDirection(x + a, y + b) && visited[x + a][y + b] === false) {
          visited[x + a][y + b] = true;
          nextLvlVertices.push([x + a, y + b]);
        }
      }
    }

    currentLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
    distance += 1;
  }

  return answer;
}
