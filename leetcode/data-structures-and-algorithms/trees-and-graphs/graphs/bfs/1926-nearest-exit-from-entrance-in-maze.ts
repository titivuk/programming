// https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/description/

function nearestExit(maze: string[][], entrance: number[]): number {
  const rows = maze.length,
    columns = maze[0].length;

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  function isValidDirection(i: number, j: number) {
    return i < rows && i >= 0 && j < columns && j >= 0 && maze[i][j] !== "+";
  }

  const visited: boolean[][] = new Array(rows);
  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(columns).fill(false);
  }

  // BFS start from entrance
  let currentLvlVertices: Array<[number, number]> = [
    [entrance[0], entrance[1]],
  ];
  visited[entrance[0]][entrance[1]] = true;
  let nextLvlVertices: Array<[number, number]> = [];

  let steps = 0;
  while (currentLvlVertices.length > 0) {
    for (const [i, j] of currentLvlVertices) {
      // 1. check if its not entrance
      // 2. check if its border
      // if both true -> it's entrance
      if (
        (i !== entrance[0] || j !== entrance[1]) &&
        (i === 0 || i === rows - 1 || j === 0 || j === columns - 1)
      ) {
        return steps;
      }

      for (const [y, x] of directions) {
        let nextRow = i + y,
          nextColumn = j + x;

        if (
          isValidDirection(nextRow, nextColumn) &&
          visited[nextRow][nextColumn] === false
        ) {
          visited[nextRow][nextColumn] = true;
          nextLvlVertices.push([nextRow, nextColumn]);
        }
      }
    }

    currentLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
    steps += 1;
  }

  return -1;
}
