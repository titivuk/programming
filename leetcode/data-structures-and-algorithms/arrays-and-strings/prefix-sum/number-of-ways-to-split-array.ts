import { strictEqual } from "assert";

// https://leetcode.com/problems/number-of-ways-to-split-array/

// Given an integer array nums,
// find the number of ways to split the array into two parts
// so that the first section has a sum greater than or equal to the sum of the second section.
// The second section should have at least one number.

function waysToSplitArray(nums: number[]): number {
  // calc prefix sum
  const prefix = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i];
  }

  let result = 0;
  let leftSum = 0,
    rightSum = 0;
  for (let i = 0; i < prefix.length - 1; i++) {
    leftSum = prefix[i];
    rightSum = prefix[nums.length - 1] - leftSum;

    if (leftSum >= rightSum) {
      result += 1;
    }
  }

  return result;
}

function waysToSplitArray_withoutArray(nums: number[]): number {
  // calculate nums total
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }

  let result = 0;
  let leftSum = 0,
    rightSum = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    leftSum += nums[i];
    rightSum = total - leftSum;

    if (leftSum >= rightSum) {
      result += 1;
    }
  }

  return result;
}

strictEqual(waysToSplitArray([10, 4, -8, 7]), 2);
strictEqual(waysToSplitArray([2, 3, 1, 0]), 2);

strictEqual(waysToSplitArray_withoutArray([10, 4, -8, 7]), 2);
strictEqual(waysToSplitArray_withoutArray([2, 3, 1, 0]), 2);
