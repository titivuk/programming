// Given an integer array nums, an array queries where queries[i] = [x, y] and an integer limit,
// return a boolean array that represents the answer to each query.
// A query is true if the sum of the subarray from x to y is less than limit, or false otherwise.

import { deepStrictEqual } from "assert";

function answerQueries(nums: number[], queries: number[][], limit: number) {
  const result: boolean[] = [];

  // create prefix array
  const prefix: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i];
  }

  let left = 0,
    right = 0;
  for (let i = 0; i < queries.length; i++) {
    left = queries[i][0];
    right = queries[i][1];

    // prefix[i] = Σ(prefix[0], ..., nums[i])
    result.push(prefix[right] - prefix[left] + nums[left] < limit);
  }

  return result;
}

deepStrictEqual(
  answerQueries(
    [1, 6, 3, 2, 7, 2],
    [
      [0, 3],
      [2, 5],
      [2, 4],
    ],
    13
  ),
  [true, false, true]
);
