// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/705/hashing/4606/

import { deepStrictEqual } from "assert";

// You are given an integer array matches where matches[i] = [winner[i], loser[i]] indicates that the player winner[i] defeated player loser[i] in a match.

// Return a list answer of size 2 where:

// answer[0] is a list of all players that have not lost any matches.
// answer[1] is a list of all players that have lost exactly one match.
// The values in the two lists should be returned in increasing order.

// Note:

// You should only consider the players that have played at least one match.
// The testcases will be generated such that no two matches will have the same outcome.

function findWinners(matches: number[][]): number[][] {
  //   const winCounter = new Map<number, number>();
  const winners = new Set<number>();
  const loseCounter = new Map<number, number>();

  for (let i = 0; i < matches.length; i++) {
    // winCounter.set(matches[i][0], (winCounter.get(matches[i][0]) ?? 0) + 1);
    winners.add(matches[i][0]);
    loseCounter.set(matches[i][1], (loseCounter.get(matches[i][1]) ?? 0) + 1);
  }

  const result: number[][] = [[], []];

  //   for (const [key, value] of winCounter) {
  for (const key of winners) {
    if (!loseCounter.has(key)) {
      result[0].push(key);
    }
  }

  for (const [key, value] of loseCounter) {
    if (loseCounter.get(key) === 1) {
      result[1].push(key);
    }
  }

  result[0].sort((a, b) => a - b);
  result[1].sort((a, b) => a - b);

  return result;
}

function findWinnersV2(matches: number[][]): number[][] {
  const result: number[][] = [[], []];

  const loseCounter = new Map<number, number>();
  for (let i = 0; i < matches.length; i++) {
    // track winner player
    if (!loseCounter.has(matches[i][0])) {
      loseCounter.set(matches[i][0], 0);
    }

    // increase player lose counter
    loseCounter.set(matches[i][1], (loseCounter.get(matches[i][1]) ?? 0) + 1);
  }

  for (const [key, value] of loseCounter) {
    if (value === 0) {
      result[0].push(key);
    } else if (value === 1) {
      result[1].push(key);
    }
  }

  // js does not have ordered map
  result[0].sort((a, b) => a - b);
  result[1].sort((a, b) => a - b);

  return result;
}

deepStrictEqual(
  findWinnersV2([
    [1, 3],
    [2, 3],
    [3, 6],
    [5, 6],
    [5, 7],
    [4, 5],
    [4, 8],
    [4, 9],
    [10, 4],
    [10, 9],
  ]),
  [
    [1, 2, 10],
    // [],
    [4, 5, 7, 8],
  ]
);

// deepStrictEqual(
//   findWinnersV2([
//     [2, 3],
//     [1, 3],
//     [5, 4],
//     [6, 4],
//   ]),
//   [[1, 2, 5, 6], []]
// );
