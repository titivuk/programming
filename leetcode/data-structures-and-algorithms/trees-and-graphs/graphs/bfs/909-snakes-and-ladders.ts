// https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/description/

import { deepStrictEqual, strict, strictEqual } from "assert";

function snakesAndLadders(board: number[][]): number {
  const n = board.length;

  function cellToIndex(cell: number, size: number): [number, number] {
    // I almost passed while figuring out the formula
    // I won't be surpised that it can be much easier and without Math.min/Math.max
    let remainder = cell % n;
    let quotient = Math.floor(cell / n);

    let i = n - quotient;
    if (remainder > 0) {
      i -= 1;
    }

    let j =
      quotient % 2 === 0
        ? Math.max(0, remainder - 1)
        : Math.min(size - remainder, size - 1);

    return [i, j];
  }

  const visited = new Array(n * n + 1).fill(false);
  // start BFS from square "1"
  let currentLvlVertices: number[] = [1];
  visited[1] = true;
  let nextLvlVertices: number[] = [];

  let row = 0,
    column = 0,
    destination = 0;

  let steps = 0;
  while (currentLvlVertices.length > 0) {
    for (const curr of currentLvlVertices) {
      if (curr === n * n) {
        return steps;
      }

      // for every vertice visit every possible direction in range [curr + 1, min(curr + 6, n^2)]
      for (let next = curr + 1; next <= Math.min(curr + 6, n * n); next++) {
        // get cell position on the board
        [row, column] = cellToIndex(next, n);

        // check if there any ladders / snakes on the next cell
        destination = board[row][column] === -1 ? next : board[row][column];

        // check if we visited the node
        if (visited[destination] === false) {
          visited[destination] = true;
          nextLvlVertices.push(destination);
        }
      }
    }

    currentLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
    steps += 1;
  }

  return -1;
}

// deepStrictEqual(cellToIndex(12), [4, 0]);
// deepStrictEqual(cellToIndex(15), [3, 2]);
// deepStrictEqual(cellToIndex(17), [3, 4]);
// deepStrictEqual(cellToIndex(36), [0, 0]);
// deepStrictEqual(cellToIndex(22), [2, 2]);
// deepStrictEqual(cellToIndex(3, 3), [2, 2]);

strictEqual(
  snakesAndLadders([
    [-1, 4, -1],
    [6, 2, 6],
    [-1, 3, -1],
  ]),
  2
);
