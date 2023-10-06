// https://leetcode.com/problems/search-insert-position/description/

function searchInsert(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1;
  let mid = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (target > nums[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
