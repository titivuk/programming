// https://leetcode.com/problems/number-of-good-pairs/

import { strictEqual } from "assert";

// Given an array of integers nums, return the number of good pairs.
// A pair (i, j) is called good if nums[i] == nums[j] and i < j.

function numIdenticalPairs(nums: number[]): number {
  let result = 0;

  const map = new Map<number, number[]>();

  for (let i = 0; i < nums.length; i++) {
    const indexes = map.get(nums[i]) ?? [];
    indexes.push(i);

    if (indexes.length > 1) {
      result += indexes.length - 1;
    }

    map.set(nums[i], indexes);
  }

  return result;
}

strictEqual(numIdenticalPairs([1, 2, 3, 1, 1, 3]), 4);
strictEqual(numIdenticalPairs([1, 1, 1, 1]), 6);
strictEqual(numIdenticalPairs([1, 2, 3]), 0);
