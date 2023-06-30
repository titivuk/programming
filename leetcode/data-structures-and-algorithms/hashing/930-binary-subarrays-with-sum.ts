import { strictEqual } from "assert";

// https://leetcode.com/problems/binary-subarrays-with-sum/

// Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.
// A subarray is a contiguous part of the array.

function numSubarraysWithSumUsingMap(nums: number[], goal: number): number {
  let result = 0;

  // init with 0 prefix sum for prefix sums = goal
  const prefixSumCounter = new Map<number, number>([[0, 1]]);

  let sum = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    // if we alredy met prefixSum = sum - goal X times -> there is X subarrays
    // which start from every index where we met prefixSum = sum - goal
    // and end at current index
    const counter = prefixSumCounter.get(sum - goal) ?? 0;
    result += counter;
    prefixSumCounter.set(sum, (prefixSumCounter.get(sum) ?? 0) + 1);
  }

  return result;
}

function numSubarraysWithSumWithoutMap(
  numsOutter: number[],
  goalOutter: number
): number {
  // function calculates number of subarrays with sum <= goal
  function numSubarraysWithAtMostSum(nums: number[], goal: number) {
    if (goal < 0) {
      return 0;
    }

    let result = 0,
      left = 0,
      sum = 0;

    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];

      // if sum > goal
      // "remove" leftmost element by incrementing left index
      while (sum > goal) {
        sum -= nums[left];
        left += 1;
      }

      result += right - left + 1;
    }

    return result;
  }

  // to get number of subarrays with sum = goal
  // subtract number of subarrays with sum <= (goal - 1) from number of subarrays with sum <= goal
  return (
    numSubarraysWithAtMostSum(numsOutter, goalOutter) -
    numSubarraysWithAtMostSum(numsOutter, goalOutter - 1)
  );
}

strictEqual(numSubarraysWithSumUsingMap([1, 0, 1, 0, 1], 2), 4);
strictEqual(numSubarraysWithSumUsingMap([0, 0, 0, 0, 0], 0), 15);

strictEqual(numSubarraysWithSumWithoutMap([1, 0, 1, 0, 1], 2), 4);
strictEqual(numSubarraysWithSumWithoutMap([0, 0, 0, 0, 0], 0), 15);
