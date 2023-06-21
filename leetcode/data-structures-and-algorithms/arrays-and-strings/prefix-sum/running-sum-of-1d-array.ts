// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/703/arraystrings/4658/

import { deepStrictEqual } from "assert";

// Given an array nums. We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
// Return the running sum of nums.

function runningSum(nums: number[]): number[] {
  const result: number[] = [];

  let accumulator = 0;
  for (let i = 0; i < nums.length; i++) {
    result[i] = accumulator + nums[i];
    accumulator = result[i];
  }

  return result;
}

deepStrictEqual(runningSum([1, 2, 3, 4]), [1, 3, 6, 10]);
deepStrictEqual(runningSum([1, 1, 1, 1, 1]), [1, 2, 3, 4, 5]);
deepStrictEqual(runningSum([3, 1, 2, 10, 1]), [3, 4, 6, 16, 17]);
