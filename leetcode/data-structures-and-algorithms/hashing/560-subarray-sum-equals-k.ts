import { strictEqual } from "assert";

// https://leetcode.com/problems/subarray-sum-equals-k/

// Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
// A subarray is a contiguous non-empty sequence of elements within an array.

function subarraySum(nums: number[], k: number): number {
  const prefixSumCounter = new Map<number, number>([[0, 1]]);

  let sum = 0,
    result = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    // if we met prefixSum = sum - k
    // it means that there is subarray with sum = k
    // since we store counter -> there are counter subarrays with sum = k
    // (when we are at i-th iteration prefixSumCounter contains information only about prefix sums from the left)
    const counter = prefixSumCounter.get(sum - k) ?? 0;
    result += counter;

    prefixSumCounter.set(sum, (prefixSumCounter.get(sum) ?? 0) + 1);
  }

  return result;
}

strictEqual(subarraySum([1, 2, 1, 2, 1], 3), 4);
strictEqual(subarraySum([1, 1, 1], 2), 2);
strictEqual(subarraySum([1, 2, 3], 3), 2);
