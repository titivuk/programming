import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/find-the-most-competitive-subsequence/description/

function mostCompetitive(nums: number[], k: number): number[] {
  // the idea is super simple
  // the string is more comptetitive than another if it has lower values on the the same positions
  // so we just need to find subsequence with the lowest values possible on every position
  // monotonically increasing stack is super suitable for that
  const increasingStack: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (
      increasingStack.length > 0 &&
      // there is an additional check that prevent popping values out of the stack
      // if there are not values left in nums to keep increasingStack.length == k
      increasingStack.length + nums.length - i > k &&
      increasingStack[increasingStack.length - 1] > nums[i]
    ) {
      increasingStack.pop();
    }

    // do not push if stack.length == k already
    if (increasingStack.length < k) {
      increasingStack.push(nums[i]);
    }
  }

  return increasingStack;
}

deepStrictEqual(mostCompetitive([3, 5, 2, 6], 2), [2, 6]);
deepStrictEqual(mostCompetitive([2, 4, 3, 3, 5, 4, 9, 6], 4), [2, 3, 3, 4]);
