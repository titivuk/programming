// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/703/arraystrings/4657/

import { strictEqual } from "assert";

// Given an array of integers nums, you start with an initial positive value startValue.
// In each iteration, you calculate the step by step sum of startValue plus elements in nums (from left to right).
// Return the minimum positive value of startValue such that the step by step sum is never less than 1.

function minStartValue(nums: number[]): number {
  // find min prefix sum
  let minPrefixSum = nums[0];
  let total = nums[0];
  for (let i = 1; i < nums.length; i++) {
    total += nums[i];

    if (minPrefixSum > total) {
      minPrefixSum = total;
    }
  }

  return Math.max(1 - minPrefixSum, 1);
}

strictEqual(minStartValue([1, 2]), 1);
strictEqual(minStartValue([1, -2, -3]), 5);
strictEqual(minStartValue([-3, 2, -3, 4, 2]), 5);
