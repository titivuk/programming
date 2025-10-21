// https://leetcode.com/problems/partition-array-such-that-maximum-difference-is-k/description

import { strictEqual } from "node:assert";

function partitionArray(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);

  let answer = 1;

  let currSmallest = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > currSmallest + k) {
      currSmallest = nums[i];
      answer += 1;
    }
  }

  return answer;
}

strictEqual(partitionArray([16, 8, 17, 0, 3, 17, 8, 20], 10), 2);
// strictEqual(partitionArray([3, 6, 1, 2, 5], 2), 2);
// strictEqual(partitionArray([1, 2, 3], 1), 2);
