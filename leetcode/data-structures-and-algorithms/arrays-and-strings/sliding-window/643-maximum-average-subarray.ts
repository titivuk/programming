// You are given an integer array nums consisting of n elements, and an integer k.
// Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.
// Any answer with a calculation error less than 10-5 will be accepted.

import { strictEqual } from "assert";

function findMaxAverage(nums: number[], k: number): number {
  let result = 0;

  let sum = 0;
  // build first window
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }

  result = sum / k;

  // go through other windows
  for (let right = k; right < nums.length; right++) {
    sum += nums[right];
    sum -= nums[right - k];

    result = Math.max(result, sum / k);
  }

  return result;
}

strictEqual(findMaxAverage([1, 12, -5, -6, 50, 3], 4), 12.75);
