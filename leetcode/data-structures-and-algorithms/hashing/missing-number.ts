import { strictEqual } from "assert";

// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/705/hashing/4602/

// Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

function missingNumber(nums: number[]): number {
  // ariphmetic progression
  // where a[0] = 0, a[n] = nums.lengths, n = nums.length + 1
  const expectedSum = (nums.length / 2) * (nums.length + 1);
  let actualSum = 0;
  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i];
  }

  return expectedSum - actualSum;
}

strictEqual(missingNumber([3, 0, 1]), 2);
strictEqual(missingNumber([0, 1]), 2);
strictEqual(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]), 8);
