// https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition

function numSubseq(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);

  let answer = 0;

  let mod = 1e9 + 7;

  // calculate powers of 2 modulo mod
  // use of Math.pow(2, right - left) inline causes NaN
  // so we precalculate power of 2 and apply mod to avoid overflow
  let pow2: number[] = new Array(nums.length);
  pow2[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    pow2[i] = (pow2[i - 1] * 2) % mod;
  }

  let right = nums.length - 1;

  // for every num
  // find biggest num which satisfies constraint nums[left] + nums[right] <= target
  // since nums are sorted, we can move right pointer from the end of the nums until nums[left] + nums[right] <= target
  // nums = [3, 3, 6, 8], target = 10
  // I)      |     |
  //      left     right
  //    combinations = 4
  //    [3] [3, 3] [3, 6] [3, 3, 6] (combinations without nums[left] are excluded)
  //
  // II) [3, 3, 6, 8]
  //         |  |
  //      left  right
  //    combinations = 2
  //    [3] [3, 6]
  // III) [3, 3, 6, 8]
  //          |  |
  //      right  left
  // for nums[left] = 6 there are no nums on the right side
  // so now left > right
  // that's why we add additional check to make sure left <= right before updating the answer
  for (let left = 0; left < nums.length; left++) {
    // find maximum possible nums[right] for given nums[left]
    while (left <= right && nums[left] + nums[right] > target) right--;

    // see III)
    if (left <= right) {
      // pow2[right - left] - how many subseqs start from nums[left] (they have to include nums[left])
      answer = (answer + pow2[right - left]) % mod;
    }
  }

  return answer;
}

numSubseq([3, 3, 6, 8], 10);
