// https://leetcode.com/problems/binary-search/

function search(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1;

  let mid = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (target === nums[mid]) {
      return mid;
    }

    if (target < nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}
