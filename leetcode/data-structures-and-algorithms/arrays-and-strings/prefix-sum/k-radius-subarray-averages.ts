// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/703/arraystrings/4836/

import { deepStrictEqual } from "assert";

// You are given a 0-indexed array nums of n integers, and an integer k.
// The k-radius average for a subarray of nums centered at some index i with the radius k
// is the average of all elements in nums between the indices i - k and i + k (inclusive).
// If there are less than k elements before or after the index i, then the k-radius average is -1.
// Build and return an array avgs of length n where avgs[i] is the k-radius average for the subarray centered at index i.
// The average of x elements is the sum of the x elements divided by x, using integer division.
// The integer division truncates toward zero, which means losing its fractional part.

function getAverages(nums: number[], k: number): number[] {
  const result: number[] = new Array(nums.length).fill(-1);

  const prefix: number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i];
  }

  for (let i = k; i < nums.length - k; i++) {
    result[i] = Math.floor(
      (prefix[i + k] - prefix[i - k] + nums[i - k]) / (k * 2 + 1)
    );
  }

  return result;
}

deepStrictEqual(
  getAverages([7, 4, 3, 9, 1, 8, 5, 2, 6], 3),
  [-1, -1, -1, 5, 4, 4, -1, -1, -1]
);
deepStrictEqual(getAverages([100000], 0), [100000]);
deepStrictEqual(getAverages([8], 100000), [-1]);
deepStrictEqual(
  getAverages([7, 4, 3, 9, 1, 8, 5, 2, 6], 3),
  [-1, -1, -1, 5, 4, 4, -1, -1, -1]
);
