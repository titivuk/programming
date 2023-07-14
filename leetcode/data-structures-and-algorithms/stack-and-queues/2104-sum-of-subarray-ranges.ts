import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/sum-of-subarray-ranges/

// You are given an integer array nums. The range of a subarray of nums is the difference between the largest and smallest element in the subarray.
// Return the sum of all subarray ranges of nums.
// A subarray is a contiguous non-empty sequence of elements within an array.

/**
 * @description To solve this
 * 1. !!! Solve https://leetcode.com/problems/sum-of-subarray-ranges/
 * 2. Based on solution above apply the same logic for minimum value and the opposite logic for maximum value
 */
function subArrayRanges(nums: number[]): number {
  let sum = 0;

  // increasing stack used to find subarrays min values
  // decreasing stack used to find subarrays max values
  // since range = max - min and sum = SUM(ranges) => sum = SUM(max) - SUM(min) => they can be calculated independently
  const increasingStack: number[] = [];
  const decreasingStack: number[] = [];
  let currExtremumIndex = -1,
    prevExtremumIndex = -1,
    nextExtremumIndex = nums.length;

  for (let i = 0; i < nums.length; i++) {
    while (
      increasingStack.length > 0 &&
      nums[increasingStack.at(-1) as number] > nums[i]
    ) {
      currExtremumIndex = increasingStack.pop() as number;
      prevExtremumIndex = increasingStack.at(-1) ?? -1;
      nextExtremumIndex = i;

      // subtract min values from sum
      sum -=
        nums[currExtremumIndex] *
        (currExtremumIndex - prevExtremumIndex) *
        (nextExtremumIndex - currExtremumIndex);
    }

    increasingStack.push(i);

    while (
      decreasingStack.length > 0 &&
      nums[decreasingStack.at(-1) as number] < nums[i]
    ) {
      currExtremumIndex = decreasingStack.pop() as number;
      prevExtremumIndex = decreasingStack.at(-1) ?? -1;
      nextExtremumIndex = i;

      // add max values to sum
      sum +=
        nums[currExtremumIndex] *
        (currExtremumIndex - prevExtremumIndex) *
        (nextExtremumIndex - currExtremumIndex);
    }

    decreasingStack.push(i);
  }

  // if stack is not empty - it means that there is a sequence of values left and every next value is greater than another
  // which means that nextExtremumIndex = nums.length
  if (increasingStack.length > 0) {
    // do the same logic as before but nextExtremumIndex = nums.length always
    nextExtremumIndex = nums.length;

    while (increasingStack.length > 0) {
      currExtremumIndex = increasingStack.pop() as number;
      prevExtremumIndex = increasingStack.at(-1) ?? -1;

      sum -=
        nums[currExtremumIndex] *
        (currExtremumIndex - prevExtremumIndex) *
        (nextExtremumIndex - currExtremumIndex);
    }
  }

  // do the same for max values
  if (decreasingStack.length > 0) {
    nextExtremumIndex = nums.length;

    while (decreasingStack.length > 0) {
      currExtremumIndex = decreasingStack.pop() as number;
      prevExtremumIndex = decreasingStack.at(-1) ?? -1;

      sum +=
        nums[currExtremumIndex] *
        (currExtremumIndex - prevExtremumIndex) *
        (nextExtremumIndex - currExtremumIndex);
    }
  }

  return sum;
}

deepStrictEqual(subArrayRanges([1, 2, 3]), 4);
deepStrictEqual(subArrayRanges([1, 3, 3]), 4);
