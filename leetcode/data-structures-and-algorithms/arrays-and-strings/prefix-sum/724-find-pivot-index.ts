// https://leetcode.com/problems/find-pivot-index/

import { strictEqual } from "assert";

// Given an array of integers nums, calculate the pivot index of this array.
// The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.
// If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.
// Return the leftmost pivot index. If no such index exists, return -1.

function pivotIndex(nums: number[]): number {
  let totalSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    totalSum += nums[i];
  }

  // case when pivot index is left edge of the array
  if (totalSum - nums[0] === 0) {
    return 0;
  }

  let leftSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (leftSum === totalSum - leftSum - nums[i]) {
      return i;
    }

    leftSum += nums[i];
  }

  return -1;
}

strictEqual(pivotIndex([1, 7, 3, 6, 5, 6]), 3);
strictEqual(pivotIndex([1, 2, 3]), -1);
strictEqual(pivotIndex([2, 1, -1]), 0);
