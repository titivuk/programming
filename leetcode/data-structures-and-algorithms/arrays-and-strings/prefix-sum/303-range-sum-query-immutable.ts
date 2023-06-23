// https://leetcode.com/problems/range-sum-query-immutable/

import { strictEqual } from "assert";

class NumArray {
  constructor(private readonly nums: number[]) {}

  sumRange(left: number, right: number): number {
    let result = 0;

    for (let i = left; i <= right; i++) {
      result += this.nums[i];
    }

    return result;
  }
}

const numArr = new NumArray([-2, 0, 3, -5, 2, -1]);

strictEqual(numArr.sumRange(0, 2), 1);
strictEqual(numArr.sumRange(2, 5), -1);
strictEqual(numArr.sumRange(0, 5), -3);
