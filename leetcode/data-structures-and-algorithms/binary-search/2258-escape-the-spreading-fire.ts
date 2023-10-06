function maximumMinutes(grid: number[][]): number {
  let rows = grid.length,
    cols = grid[0].length;

  let directions: number[][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  function isValid(i: number, j: number): boolean {
    return i >= 0 && i < rows && j >= 0 && j < cols;
  }

  /**
   * for every cell
   * calculate when it will be on fire
   */
  let fireSchedule: number[][] = [];

  let currentLvlVertices: Array<[number, number]> = [],
    nextLvlVertices: Array<[number, number]> = [];

  // find where fire starts
  for (let i = 0; i < rows; i++) {
    fireSchedule[i] = [];

    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        fireSchedule[i][j] = 0;

        currentLvlVertices.push([i, j]);
      } else {
        fireSchedule[i][j] = Number.POSITIVE_INFINITY;
      }
    }
  }

  // use BFS to calculate fire schedule
  let iNext = 0,
    jNext = 0;

  let time = 0;
  while (currentLvlVertices.length > 0) {
    for (const [i, j] of currentLvlVertices) {
      fireSchedule[i][j] = time;

      for (const [iOffset, jOffset] of directions) {
        iNext = i + iOffset;
        jNext = j + jOffset;

        if (
          isValid(iNext, jNext) &&
          grid[iNext][jNext] !== 2 &&
          fireSchedule[iNext][jNext] === Number.POSITIVE_INFINITY
        ) {
          nextLvlVertices.push([iNext, jNext]);
        }
      }
    }

    currentLvlVertices = nextLvlVertices;
    nextLvlVertices = [];

    time += 1;
  }

  // the problem says:
  // Note that even if the fire spreads to the safehouse immediately after you have reached it, it will be counted as safely reaching the safehouse.
  // it means that it's ok if we move to the safehouse and on the same minute it will burn
  // so in order to avoid edge case condition check for safehouse where we add nextLvlVertices
  // just increment the schedule once for the safehouse
  fireSchedule[rows - 1][cols - 1] += 1;

  function check(time: number): boolean {
    /**
     * apply BFS from top left to bottom right corner to find the path
     */

    let visited: boolean[][] = [];
    for (let i = 0; i < rows; i++) {
      visited[i] = new Array<boolean>(cols).fill(false);
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
        if (i === rows - 1 && j === cols - 1) {
          return true;
        }

        for (const [iOffset, jOffset] of directions) {
          iNext = i + iOffset;
          jNext = j + jOffset;

          if (
            isValid(iNext, jNext) &&
            visited[iNext][jNext] === false &&
            // we can move only through a grass
            grid[iNext][jNext] !== 2 &&
            // and if we won't burn on that cell
            fireSchedule[iNext][jNext] > time + 1
          ) {
            visited[iNext][jNext] = true;
            nextLvlVertices.push([iNext, jNext]);
          }
        }
      }

      currentLvlVertices = nextLvlVertices;
      nextLvlVertices = [];

      time += 1;
    }

    return false;
  }

  let left = -1,
    right = 1e9,
    mid = 0;

  let answer = -1;

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

// maximumMinutes([
//   [0, 0, 0, 0],
//   [0, 1, 2, 0],
//   [0, 2, 0, 0],
// ]);

// maximumMinutes([
//   [0, 0, 0],
//   [2, 2, 0],
//   [1, 2, 0],
// ]);

maximumMinutes([
  [0, 2, 0, 0, 1],
  [0, 2, 0, 2, 2],
  [0, 2, 0, 0, 0],
  [0, 0, 2, 2, 0],
  [0, 0, 0, 0, 0],
]);
