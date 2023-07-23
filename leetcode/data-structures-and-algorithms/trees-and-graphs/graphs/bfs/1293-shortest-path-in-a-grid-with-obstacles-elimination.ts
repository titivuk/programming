// https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/

import { strictEqual } from "node:assert";

// You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.
// Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.

/**
 * @description detailed explanation there https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/707/traversals-trees-graphs/4631/
 * I stuck at visited implementation and could not figure out that we need store not just true/false but remaining value instead
 * And if visited[i][j] >= remaining -> we already visited that node and we had more remaining eliminations, so previous path is better
 * because we at the same place but with more removals remaining
 */
function shortestPath(grid: number[][], k: number): number {
  if (grid[0][0] === 1) {
    return -1;
  }

  // m = rows
  // n = columns
  const m = grid.length,
    n = grid[0].length;

  // instead of check every direction with if
  // we can use array of directions and iterate over it
  function validDirection(row: number, col: number) {
    return 0 <= row && row < m && 0 <= col && col < n;
  }
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let answer = 0;

  const visited: number[][] = [];
  // could not figure out myself to store remaining values in visited and compare them
  for (let i = 0; i < m; i++) {
    // k + 1 because we store combination of (node, remaining). And remaining is [0, k]
    // so for every node we can store k combinations
    visited[i] = new Array(k + 1).fill(-1);
  }

  // store indicies + how many eliminations remaining
  // and start from top-left cell
  let currLvlVertcies: Array<[number, number, number]> = [[0, 0, k]];
  let nextLvlVertices: Array<[number, number, number]> = [];

  while (currLvlVertcies.length > 0) {
    for (let [i, j, remaining] of currLvlVertcies) {
      // using BFS, when we meet target vertice - it's guaranted we reach it using the shortest path
      if (i === m - 1 && j === n - 1) {
        return answer;
      }

      // if the current square is an obstacle, we need to spend one of our removals
      if (grid[i][j] === 1) {
        if (remaining === 0) {
          continue;
        } else {
          remaining -= 1;
        }
      }

      // if the square has already been visited, but with more removals remaining, then the current
      // path is pointless, since more removals is better
      if (visited[i][j] >= remaining) {
        continue;
      }

      // save best case when remaining is the biggest
      visited[i][j] = remaining;

      for (const [x, y] of directions) {
        let nextRow = i + y,
          nextCol = j + x;

        if (validDirection(nextRow, nextCol)) {
          nextLvlVertices.push([nextRow, nextCol, remaining]);
        }
      }
    }

    currLvlVertcies = nextLvlVertices;
    nextLvlVertices = [];
    answer += 1;
  }

  return -1;
}

strictEqual(
  shortestPath(
    [
      [0, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [0, 0],
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 0],
      [1, 0],
      [1, 0],
      [0, 0],
    ],
    4
  ),
  14
);
