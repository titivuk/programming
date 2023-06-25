import { deepStrictEqual } from "node:assert";

// https://leetcode.com/problems/two-sum/

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.

// If the question wanted us to return a boolean indicating if a pair exists or to return the numbers themselves,
// then we could just use a set. However, since it wants the indices of the numbers,
// we need to use a hash map to "remember" what indices the numbers are at.

function twoSum(nums: number[], target: number): number[] {
  // create map where key - nums[i], value - i
  const numsMap = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    let index = numsMap.get(target - nums[i]);

    if (typeof index === "number") {
      return [i, index];
    }

    // we can set values as we go because if, for example,
    // there is a pair [i, j] and for i j is not in the map yet
    // when we will check j - i will be already available
    // our solution also does not require any order, so [1, 0] ~ [0, 1]
    numsMap.set(nums[i], i);
  }

  return [-1, -1];
}

deepStrictEqual(twoSum([2, 7, 11, 15], 9), [1, 0]);
deepStrictEqual(twoSum([3, 2, 4], 6), [2, 1]);
deepStrictEqual(twoSum([3, 3], 6), [1, 0]);
