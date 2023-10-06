// https://leetcode.com/problems/split-nums-largest-sum/description/

function splitArray(nums: number[], k: number): number {
  // we are asked to find split such that the largest sum of any subarray is minimized.
  // in other words, we need to find minimum, so the answer is "left" pointer

  function check(maxSum: number) {
    // we need to split nums such that every subarray sum lte than maxSum

    let currentSum = 0,
      splitsRequired = 0;

    for (let i = 0; i < nums.length; i++) {
      // if single num greater than maxSum
      // then it's not possible to split the array in any way
      if (nums[i] > maxSum) {
        return false;
      }

      // Add nums[i] only if the sum doesn't exceed maxSum
      if (currentSum + nums[i] <= maxSum) {
        currentSum += nums[i];
      } else {
        // If the nums[i] addition makes sum greater than maxSum
        // Increment the splits required and reset sum
        currentSum = nums[i];
        splitsRequired++;
      }
    }

    // if we can split array into N subarrays, we can split it into more than N subarrays (the more we split the less subarray sum is)
    // subarrays = splitRequired + 1
    return splitsRequired + 1 <= k;
  }

  let left = 0,
    right = 0;
  // set inital borders
  // max(nums) <= min maxSum <= sum(nums)
  for (let i = 0; i < nums.length; i++) {
    left = Math.max(left, nums[i]);
    right += nums[i];
  }

  let mid = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (check(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

splitArray([1, 4, 4], 3);
