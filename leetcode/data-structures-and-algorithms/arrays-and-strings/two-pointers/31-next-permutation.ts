// https://leetcode.com/problems/next-permutation/

/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
  // We need to find NEXT permutation
  // so it has to be minimum possible permutation greater than the given one
  // example
  // nums = [4, 3, 2, 5, 3, 1]
  // 1. to minimize permutation increase we need to start from the end
  // 2. we need to find first num from the end which is less than its right neighbor
  //    [4, 3, (2), 5, 3, 1] - nums[left] = 2
  //            |
  //           left
  //
  //    to minimize increase we need to swap it with the min num from the right side
  //    where nums[i] > nums[left], i = [left + 1, nums.length - 1]
  //    [4, 3, (2), 5, (3), 1] - nums[i] = 3
  //            |       |
  //           left     i
  //    After swap
  //    [4, 3, (3), 5, (2), 1]
  // 3. After we swapped the values, we need to sort the right side ASC
  //    Subarray from the right side of the "left" is ordered DESC (because we iterate until that condition is violated)
  //    So we can jsut reverse it and turn DESC into ASC

  let left = nums.length - 2;
  let tmp = 0;

  // 2. find "left"
  while (left >= 0 && nums[left + 1] <= nums[left]) {
    left--;
  }

  // if left found - find swap
  if (left >= 0) {
    let i = nums.length - 1;
    let right = left;

    while (i > left) {
      if (nums[i] > nums[left]) {
        right = i;
        break;
      }

      i--;
    }

    // swap nums
    tmp = nums[left];
    nums[left] = nums[right];
    nums[right] = tmp;
  }

  // 3.
  let l = left + 1,
    r = nums.length - 1;
  while (l < r) {
    tmp = nums[l];
    nums[l] = nums[r];
    nums[r] = tmp;

    l++;
    r--;
  }
}

// nextPermutation([4, 3, 2, 5, 3, 1]);
// nextPermutation([4, 3, 2, 1]);
nextPermutation([1, 2]);
