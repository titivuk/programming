// https://leetcode.com/problems/last-day-where-you-can-still-cross/

function latestDayToCross(row: number, col: number, cells: number[][]): number {
  let directions: number[][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  // create graph
  let matrix: number[][] = [];
  for (let i = 0; i < row; i++) {
    matrix[i] = new Array(col).fill(0);
  }
  // and set matrix[i][j] = time when the cell becomes water
  for (let i = 0; i < cells.length; i++) {
    // the problem says that coodrinates are 1-based
    // so we subtract 1 from coordinates
    // also i-th index represents i + 1 day
    // so we add 1
    matrix[cells[i][0] - 1][cells[i][1] - 1] = i + 1;
  }

  function isValid(i: number, j: number): boolean {
    return i >= 0 && i < row && j >= 0 && j < col;
  }

  // mb BFS is better, but both work. The ugly thing here is to check result every time and return true if the result is true
  // DFS chosen just for practice
  function dfs(day: number, i: number, j: number, visited: boolean[][]) {
    visited[i][j] = true;

    // if we reached bottom row -> return immediately
    if (i === row - 1) {
      return true;
    }

    let iNext = 0,
      jNext = 0;

    // check every allowed allowed direction
    for (const [iOffset, jOffset] of directions) {
      iNext = i + iOffset;
      jNext = j + jOffset;

      if (
        isValid(iNext, jNext) &&
        visited[iNext][jNext] === false &&
        // the cell is still land
        matrix[iNext][jNext] > day
      ) {
        let result = dfs(day, iNext, jNext, visited);

        if (result) {
          return true;
        }
      }
    }

    return false;
  }

  function check(day: number): boolean {
    // try to find path from every top cell
    for (let j = 0; j < col; j++) {
      // every attempt requires visited matrix
      let visited: boolean[][] = [];
      for (let i = 0; i < row; i++) {
        visited[i] = new Array<boolean>(col).fill(false);
      }

      // if starting point becomes water later than given day -> start
      if (matrix[0][j] > day) {
        let result = dfs(day, 0, j, visited);

        // if path found -> return immediately
        if (result) {
          return true;
        }
      }
    }

    return false;
  }

  let answer = 0;

  let left = 0,
    right = 2 * 1e4,
    mid = 0;

  while (left < right) {
    mid = Math.floor((left + right + 1) / 2);

    if (check(mid)) {
      answer = mid;
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

latestDayToCross(2, 2, [
  [1, 1],
  [2, 1],
  [1, 2],
  [2, 2],
]);

// latestDayToCross(3, 3, [
//   [1, 2],
//   [2, 1],
//   [3, 3],
//   [2, 2],
//   [1, 1],
//   [1, 3],
//   [2, 3],
//   [3, 2],
//   [3, 1],
// ]);
