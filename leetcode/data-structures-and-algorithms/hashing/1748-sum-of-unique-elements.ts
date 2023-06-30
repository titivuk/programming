import { strictEqual } from "assert";

// https://leetcode.com/problems/sum-of-unique-elements/

// You are given an integer array nums.
// The unique elements of an array are the elements that appear exactly once in the array.

// Return the sum of all the unique elements of nums.

function sumOfUnique(nums: number[]): number {
  let result = 0;

  // try to use arr instead of Map since 1 <= nums[i] <= 100
  const arrMap = new Array(101).fill(0);
  for (let i = 0; i < nums.length; i++) {
    arrMap[nums[i]] += 1;
  }

  for (let i = 1; i < arrMap.length; i++) {
    if (arrMap[i] === 1) {
      result += i;
    }
  }

  return result;
}

function sumOfUniqueSingleLoop(nums: number[]): number {
  let result = 0;

  // try to use arr instead of Map since 1 <= nums[i] <= 100
  const arrMap = new Array(101).fill(0);
  for (let i = 0; i < nums.length; i++) {
    if (arrMap[nums[i]] !== -1) {
      // if we meet value the 1st time
      // add it to the result
      // and increase counter
      if (arrMap[nums[i]] === 0) {
        arrMap[nums[i]] += 1;
        result += nums[i];
      }
      // if we meet value the 2nd time
      // subtract the value from the result (we added it when met it the 1st time)
      // and set counter = -1 to skip processing next time we meet it
      else {
        result -= nums[i];
        arrMap[nums[i]] = -1;
      }
    }
  }

  return result;
}

strictEqual(sumOfUnique([1, 2, 3, 2]), 4);
strictEqual(sumOfUnique([1, 1, 1, 1, 1]), 0);
strictEqual(sumOfUnique([1, 2, 3, 4, 5]), 15);
strictEqual(
  sumOfUnique([
    14, 83, 63, 42, 15, 87, 61, 37, 30, 95, 99, 100, 45, 30, 5, 2, 29, 65, 15,
    71, 12, 17, 61, 81,
  ]),
  947
);

strictEqual(sumOfUniqueSingleLoop([1, 2, 3, 2]), 4);
strictEqual(sumOfUniqueSingleLoop([1, 1, 1, 1, 1]), 0);
strictEqual(sumOfUniqueSingleLoop([1, 2, 3, 4, 5]), 15);
strictEqual(
  sumOfUniqueSingleLoop([
    14, 83, 63, 42, 15, 87, 61, 37, 30, 95, 99, 100, 45, 30, 5, 2, 29, 65, 15,
    71, 12, 17, 61, 81,
  ]),
  947
);
