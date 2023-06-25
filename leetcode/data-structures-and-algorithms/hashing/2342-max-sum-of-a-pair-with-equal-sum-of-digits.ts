import { strictEqual } from "assert";

// https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits/

// You are given a 0-indexed array nums consisting of positive integers.
// You can choose two indices i and j, such that i != j, and the sum of digits of the number nums[i] is equal to that of nums[j].

// Return the maximum value of nums[i] + nums[j] that you can obtain over all possible indices i and j that satisfy the conditions.

function maximumSum(nums: number[]): number {
  let result = -1;

  const digitsSumToNumsMap = new Map<number, number[]>();

  let num = 0;
  for (let i = 0; i < nums.length; i++) {
    // sum digits
    num = nums[i];
    let digitSum = 0;
    while (num > 0) {
      digitSum += num % 10;
      num = Math.floor(num / 10);
    }

    const group = digitsSumToNumsMap.get(digitSum) ?? [];
    group.push(nums[i]);
    digitsSumToNumsMap.set(digitSum, group);
  }

  for (const [digitSum, nums] of digitsSumToNumsMap) {
    let max1 = 0,
      max2 = -1;
    if (nums.length > 1) {
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] > max1) {
          max2 = max1;
          max1 = nums[i];
        } else if (nums[i] > max2) {
          max2 = nums[i];
        }
      }

      result = Math.max(result, max1 + max2);
    }
  }

  return result;
}

function maximumSumSingleLoop(nums: number[]): number {
  let result = -1;

  const digitsSumToNumsMap = new Map<number, number>();

  let num = 0;
  for (let i = 0; i < nums.length; i++) {
    // sum digits
    num = nums[i];
    let digitSum = 0;
    while (num > 0) {
      digitSum += num % 10;
      num = Math.floor(num / 10);
    }

    // sum nums[i] with max value at the momemnt (we store it in the map)
    if (digitsSumToNumsMap.has(digitSum)) {
      result = Math.max(
        result,
        (digitsSumToNumsMap.get(digitSum) as number) + nums[i]
      );
    }

    // save nums[i] if it's bigger than currently stored
    digitsSumToNumsMap.set(
      digitSum,
      Math.max(digitsSumToNumsMap.get(digitSum) ?? 0, nums[i])
    );
  }

  return result;
}

strictEqual(maximumSum([18, 43, 36, 13, 7]), 54);

strictEqual(maximumSum([10, 12, 19, 14]), -1);
