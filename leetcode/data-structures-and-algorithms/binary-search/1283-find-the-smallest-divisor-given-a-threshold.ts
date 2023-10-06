// https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/description/

function smallestDivisor(nums: number[], threshold: number): number {
  function check(divisor: number) {
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
      sum += Math.ceil(nums[i] / divisor);
    }

    return sum <= threshold;
  }

  let left = 0,
    right = Math.max(...nums);

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
