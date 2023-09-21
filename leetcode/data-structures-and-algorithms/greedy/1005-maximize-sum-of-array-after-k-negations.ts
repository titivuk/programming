// https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/

function largestSumAfterKNegations(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length && i < k; i++) {
    nums[i] = -nums[i];
  }

  let answer = 0;
  for (let i = 0; i < nums.length; i++) {
    answer += nums[i];
  }

  return answer;
}
