import { strictEqual } from "assert";

function largestUniqueNumber(nums: number[]): number {
  let result = -1;

  const numCounter = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    numCounter.set(nums[i], (numCounter.get(nums[i]) ?? 0) + 1);
  }

  for (const [num, counter] of numCounter) {
    if (num > result && counter === 1) {
      result = num;
    }
  }

  return result;
}

strictEqual(largestUniqueNumber([5, 7, 3, 9, 4, 9, 8, 3, 1]), 8);
strictEqual(largestUniqueNumber([9, 9, 8, 8]), -1);
