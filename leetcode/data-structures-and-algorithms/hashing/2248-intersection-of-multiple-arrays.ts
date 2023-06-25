import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/intersection-of-multiple-arrays/

// Given a 2D array nums that contains n arrays of distinct integers,
// return a sorted array containing all the numbers that appear in all n arrays.

// For example, given nums = [[3,1,2,4,5],[1,2,3,4],[3,4,5,6]],
// return [3, 4]. 3 and 4 are the only numbers that are in all arrays.

function intersection(nums: number[][]): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      let counter = map.get(nums[i][j]);

      if (typeof counter === "number") {
        map.set(nums[i][j], counter + 1);
      } else {
        map.set(nums[i][j], 1);
      }
    }
  }

  const result: number[] = [];
  for (const [key, value] of map) {
    if (value >= nums.length) {
      result.push(key);
    }
  }

  return result.sort((a, b) => a - b);
}

deepStrictEqual(
  intersection([
    [3, 1, 2, 4, 5],
    [1, 2, 3, 4],
    [3, 4, 5, 6],
  ]),
  [3, 4]
);

deepStrictEqual(
  intersection([
    [1, 2, 3],
    [4, 5, 6],
  ]),
  []
);
