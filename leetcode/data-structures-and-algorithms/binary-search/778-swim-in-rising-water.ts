// https://leetcode.com/problems/swim-in-rising-water/

function swimInWater(grid: number[][]): number {
  let n = grid.length;

  let directions: number[][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  function isValid(i: number, j: number): boolean {
    return i >= 0 && i < n && j >= 0 && j < n;
  }

  function check(time: number): boolean {
    // check starting point
    if (time < grid[0][0]) {
      return false;
    }

    // apply BFS from top left to bottom right corner to find the path

    let visited: boolean[][] = [];
    for (let i = 0; i < n; i++) {
      visited[i] = new Array<boolean>(n).fill(false);
    }

    // start from top left corner
    let currentLvlVertices: Array<[number, number]> = [[0, 0]],
      nextLvlVertices: Array<[number, number]> = [];
    visited[0][0] = true;

    let iNext = 0,
      jNext = 0;
    while (currentLvlVertices.length > 0) {
      for (const [i, j] of currentLvlVertices) {
        // bottom right corner reached
        if (i === n - 1 && j === n - 1) {
          return true;
        }

        for (const [iOffset, jOffset] of directions) {
          iNext = i + iOffset;
          jNext = j + jOffset;

          if (
            isValid(iNext, jNext) &&
            visited[iNext][jNext] === false &&
            // apply additional check to make sure we can move to the given neighbor
            grid[iNext][jNext] <= time
          ) {
            visited[iNext][jNext] = true;
            nextLvlVertices.push([iNext, jNext]);
          }
        }
      }

      currentLvlVertices = nextLvlVertices;
      nextLvlVertices = [];
    }

    return false;
  }

  let left = 0,
    right = n ** 2,
    mid = 0;

  let answer = 0;

  while (left < right) {
    mid = Math.floor((left + right) / 2);

    if (check(mid)) {
      answer = mid;

      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}
