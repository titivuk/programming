// https://leetcode.com/problems/search-in-rotated-sorted-array/

function search_twoBS(nums: number[], target: number): number {
  // ASC order
  // DISTINCT values

  let left = 0,
    right = nums.length - 1,
    mid = 0;

  // FIRST STEP
  // find index from which array is rotated
  // if array is not rotated - rotationIndex = 0;
  while (left < right) {
    mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  let rotationIndex = left;

  // SECOND STEP
  // having rotationIndex - decide which subarray to traverse - [0, pivot - 1] or [pivot, arr.length - 1]
  // NOTE:

  // right side
  if (target < nums[0]) {
    left = rotationIndex;
    right = nums.length - 1;
  }
  // left side
  else {
    left = 0;

    right = rotationIndex > 0 ? rotationIndex - 1 : nums.length - 1;
  }

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

function search_singleBS(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1;

  let mid = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // [left, mid] subarray is sorted
    if (nums[left] <= nums[mid]) {
      // if target inside [left, mid] subarray
      //  - move to the left part
      // else
      //  - move to the right part
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // [mid, right] subarray is sorted
    else {
      // if target inside [mid, right] subarray
      //  - move to the right part
      // else
      //  - move to the left part
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

// search([4, 5, 6, 7, 0, 1, 2], 0);
// search([4, 5, 6, 7, 0, 1, 2], 3);
// search([3, 1], 3); // 1
// search([4, 5, 6, 7, 0, 1, 2], 0); // 4
// search([5, 1, 3], 3); // 1

// search([1, 2, 3, 4], 0); // 4

// search([1], 1);
search_twoBS([1, 3], 3);
