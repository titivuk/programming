import { strictEqual } from "assert";

// https://leetcode.com/problems/maximum-erasure-value/

// You are given an array of positive integers nums and want to erase a subarray containing unique elements. The score you get by erasing the subarray is equal to the sum of its elements.
// Return the maximum score you can get by erasing exactly one subarray.
// An array b is called to be a subarray of a if it forms a contiguous subsequence of a, that is, if it is equal to a[l],a[l+1],...,a[r] for some (l,r).

function maximumUniqueSubarray(nums: number[]): number {
  let result = 0;

  const subArrayUniqueValues = new Set<number>();

  let sum = 0,
    left = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    subArrayUniqueValues.add(nums[right]);

    while (right - left + 1 > subArrayUniqueValues.size) {
      sum -= nums[left];
      if (nums[left] !== nums[right]) {
        subArrayUniqueValues.delete(nums[left]);
      }

      left += 1;
    }

    result = Math.max(result, sum);
  }

  return result;
}

strictEqual(maximumUniqueSubarray([4, 2, 4, 5, 6]), 17);
strictEqual(maximumUniqueSubarray([5, 2, 1, 2, 5, 2, 1, 2, 5]), 8);
