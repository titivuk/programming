/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
  k = k % nums.length;

  for (let i = 0; i < k; i++) {
    let prev = nums[nums.length - 1],
      tmp = 0;
    for (let j = 0; j < nums.length; j++) {
      tmp = nums[j];
      nums[j] = prev;
      prev = tmp;
    }
  }
}

/**
 Do not return anything, modify nums in-place instead.
 */
function rotate_smart_reverse(nums: number[], k: number): void {
  // if k === nums.length it means we will do whole round and the array remain the same
  // so we remove redundrant rounds
  k = k % nums.length;

  function reverse(array: number[], start: number, end: number) {
    let left = start,
      right = end;

    let tmp = 0;
    while (left < right) {
      tmp = array[left];

      array[left] = array[right];
      array[right] = tmp;

      left++;
      right--;
    }
  }

  // first, reverse whole array
  // [1, 2, 3, 4, 5, 6, 7] => [7, 6, 5, 4, 3, 2, 1]
  reverse(nums, 0, nums.length - 1);
  // second, reverse [nums[0], ..., nums[k]] sub array to restore the original order
  // [7, 6, 5, 4, 3, 2, 1] => [5, 6, 7, 4, 3, 2, 1]
  //  -  -  -                  -  -  -
  reverse(nums, 0, k - 1);
  // and the last, we reverse [nums[k + 1], ..., nums[nums.length - 1]] sub array to restore the original order
  // [5, 6, 7, 4, 3, 2, 1] => [5, 6, 7, 1, 2, 3, 4]
  //           -  -  -  -               -  -  -  -
  reverse(nums, k, nums.length - 1);
}

rotate_smart_reverse([1, 2, 3, 4, 5, 6, 7], 3);
