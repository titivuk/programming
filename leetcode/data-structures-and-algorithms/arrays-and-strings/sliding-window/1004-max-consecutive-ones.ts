// Given a binary array nums and an integer k,
// return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

import { strictEqual } from "assert";

function longestOnes(nums: number[], k: number): number {
  let result = 0;

  let zeroes = 0;

  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      zeroes += 1;
    }

    // move left border of sliding window until subarray has k zeroes at most
    while (zeroes > k) {
      if (nums[left] === 0) {
        zeroes -= 1;
      }

      left += 1;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

strictEqual(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2), 6);
strictEqual(
  longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3),
  10
);
