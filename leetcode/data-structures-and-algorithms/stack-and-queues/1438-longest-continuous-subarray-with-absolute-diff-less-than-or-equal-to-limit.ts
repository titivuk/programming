import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/

// Given an array of integers nums and an integer limit
// return the size of the longest non-empty subarray
// such that the absolute difference between any two elements of this subarray is less than or equal to limit.

function longestSubarray(nums: number[], limit: number): number {
  // increasingDequeue maintains the minumum value of the current window at 0th index
  const increasingDequeue: number[] = [];
  // decreasingDequeue maintains the maximum value of the current window at 0th index
  const decreasingDequeue: number[] = [];

  let result = 0;

  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    // maintain the monotonic deques
    while (
      increasingDequeue.length > 0 &&
      increasingDequeue[increasingDequeue.length - 1] > nums[right]
    ) {
      increasingDequeue.pop();
    }

    // maintain the monotonic deques
    while (
      decreasingDequeue.length > 0 &&
      decreasingDequeue[decreasingDequeue.length - 1] < nums[right]
    ) {
      decreasingDequeue.pop();
    }

    increasingDequeue.push(nums[right]);
    decreasingDequeue.push(nums[right]);

    // sliding windows approach
    // recall while (something > limit) - move left border
    // our constraint is max - min must be <= limit
    // but max = decreasingDequeue[0] and min = increasingDequeue[0]
    while (decreasingDequeue[0] - increasingDequeue[0] > limit) {
      if (nums[left] === decreasingDequeue[0]) {
        decreasingDequeue.shift();
      }
      if (nums[left] === increasingDequeue[0]) {
        increasingDequeue.shift();
      }

      left += 1;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

// deepStrictEqual(longestSubarray([8, 2, 4, 7], 4), 2);
// deepStrictEqual(longestSubarray([10, 1, 2, 4, 7, 2], 5), 4);
deepStrictEqual(longestSubarray([1, 5, 6, 7, 8, 10, 6, 5, 6], 4), 5);
