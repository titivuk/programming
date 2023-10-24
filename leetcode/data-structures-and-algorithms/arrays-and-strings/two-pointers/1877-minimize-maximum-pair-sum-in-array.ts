// https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/

function minPairSum(nums: number[]): number {
  // we want to pair min with max
  nums.sort((a, b) => a - b);

  let answer = 0;

  let left = 0,
    right = nums.length - 1;

  // pair maximum with minimum
  // and remember the maximum pair
  while (left < right) {
    answer = Math.max(answer, nums[left] + nums[right]);

    left++;
    right--;
  }

  return answer;
}
