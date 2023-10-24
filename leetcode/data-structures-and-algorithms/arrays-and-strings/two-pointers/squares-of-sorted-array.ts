import { deepStrictEqual } from "assert";

/**
 * @description approach is the same but smarter than my 1st implementation
 */
function sortedSquares(nums: number[]): number[] {
  const result: number[] = [];

  // left - start from smallest negative which actually has the biggest absolute value
  // right - start from biggest positive
  let left = 0,
    right = nums.length - 1;

  // fill the array from behind, adding biggest values first
  for (let i = nums.length - 1; i >= 0; i--) {
    if (Math.abs(nums[left]) < Math.abs(nums[right])) {
      result[i] = Math.pow(nums[right], 2);
      right--;
    } else {
      result[i] = Math.pow(nums[left], 2);
      left++;
    }
  }

  return result;
}

deepStrictEqual(
  sortedSquares([-4, -1, 0, 3, 10]),
  [0, 1, 9, 16, 100]
);
deepStrictEqual(
  sortedSquares([-7, -3, 2, 3, 11]),
  [4, 9, 9, 49, 121]
);
