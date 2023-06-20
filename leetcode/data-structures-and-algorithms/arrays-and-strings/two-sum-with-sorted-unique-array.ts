/**
 * @description two pointers technique
 */
function twoSumWithSortedUniqueArray(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    if (nums[left] + nums[right] === target) {
      return true;
    }

    if (nums[left] + nums[right] > target) {
      right -= 1;
    } else {
      left += 1;
    }
  }

  return false;
}

console.log(twoSumWithSortedUniqueArray([1, 2, 4, 6, 8, 9, 14, 15], 13));
