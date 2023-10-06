// https://leetcode.com/problems/path-with-minimum-effort/

function minimumEffortPath(heights: number[][]): number {
  let rows = heights.length,
    cols = heights[0].length;

  function check(effort: number) {
    function validCell(i: number, j: number) {
      return i >= 0 && i < rows && j >= 0 && j < cols;
    }

    // all possible directions
    let directions: number[][] = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    // Check if you can reach bottom right corner with given "effort" using BFS
    // DFS can be used as well
    let visited: boolean[][] = new Array(rows);
    for (let i = 0; i < rows; i++) {
      visited[i] = new Array(cols).fill(false);
    }

    let currVertices: Array<[number, number]> = [[0, 0]],
      nextVertices: Array<[number, number]> = [];
    visited[0][0] = true;

    let row = 0,
      col = 0;
    let nextRow = 0,
      nextCol = 0;
    while (currVertices.length > 0) {
      for (let i = 0; i < currVertices.length; i++) {
        row = currVertices[i][0];
        col = currVertices[i][1];

        // if we reach bottom right cell - return immediately
        if (row === rows - 1 && col === cols - 1) {
          return true;
        }

        // check neighbor vertices
        for (let [rowOffset, colOffset] of directions) {
          nextRow = row + rowOffset;
          nextCol = col + colOffset;

          // if neighbor is valid (not out of border) and not yet visited and we have enough effort to visit it
          // "schedule" the neighbor for visit
          if (
            validCell(nextRow, nextCol) &&
            Math.abs(heights[row][col] - heights[nextRow][nextCol]) <= effort &&
            visited[nextRow][nextCol] === false
          ) {
            visited[nextRow][nextCol] = true;
            nextVertices.push([nextRow, nextCol]);
          }
        }
      }

      currVertices = nextVertices;
      nextVertices = [];
    }

    // bottom right cell was not visited
    return false;
  }

  // min effort
  let left = 0,
    //  max effort
    right = Math.max(...heights.flat());

  let mid = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (check(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

minimumEffortPath([
  [1, 2, 2],
  [3, 8, 2],
  [5, 3, 5],
]);
