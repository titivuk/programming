// https://leetcode.com/problems/move-zeroes/

import { deepStrictEqual } from "assert";

// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
// Note that you must do this in-place without making a copy of the array.

/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let left = 0,
    right = 1;

  let tmp = 0;
  while (right < nums.length) {
    // need to swap left value with non-zero value
    if (nums[left] === 0) {
      // do need to swap 0 with 0, move right pointer to the next element
      if (nums[right] === 0) {
        right += 1;
      }
      // nums[left] === 0 && nums[right] !== 0
      // swap values
      else {
        tmp = nums[left];
        nums[left] = nums[right];
        nums[right] = tmp;

        left += 1;
        right += 1;
      }
    }
    // left pointer points to non-zero value
    // move further
    else {
      left += 1;
      right += 1;
    }
  }
}

const input1 = [0, 1, 0, 3, 12];
moveZeroes(input1);
deepStrictEqual(input1, [1, 3, 12, 0, 0]);

const input2 = [0];
moveZeroes(input2);
deepStrictEqual(input2, [0]);
