import { deepStrictEqual } from "assert";

function prefixSum(nums: number[]): number[] {
  const result: number[] = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    result[i] = result[i - 1] + nums[i];
  }

  return result;
}

deepStrictEqual(prefixSum([5, 2, 1, 6, 3, 8]), [5, 7, 8, 14, 17, 25]);
