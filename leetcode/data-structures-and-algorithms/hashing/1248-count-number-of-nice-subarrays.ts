import { strictEqual } from "assert";

// https://leetcode.com/problems/count-number-of-nice-subarrays/

// Given an array of integers nums and an integer k.
// A continuous subarray is called nice if there are k odd numbers on it.
// Return the number of nice sub-arrays.

function numberOfSubarrays(nums: number[], k: number): number {
  const oddSumCounter = new Map<number, number>([[0, 1]]);

  let currOddCounter = 0,
    result = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 !== 0) {
      currOddCounter += 1;
    }

    // if we already met oddCounter = currOddCounter - k
    // it means that there is subarray with oddCounter = k
    // since we store counter -> there are counter subarrays with sum = k
    // (when we are at i-th iteration oddSumCounter contains information only about odd counters from the left)
    const counter = oddSumCounter.get(currOddCounter - k) ?? 0;
    result += counter;

    oddSumCounter.set(
      currOddCounter,
      (oddSumCounter.get(currOddCounter) ?? 0) + 1
    );
  }

  return result;
}

strictEqual(numberOfSubarrays([1, 1, 2, 1, 1], 3), 2);
strictEqual(numberOfSubarrays([2, 4, 6], 1), 0);
strictEqual(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2), 16);
