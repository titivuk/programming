// Given an array of positive integers nums and an integer k,
// return the number of subarrays where the product of all the elements in the subarray is strictly less than k.

function numSubarrayProductLessThanK(nums: number[], k: number): number {
  if (k <= 1) {
    return 0;
  }

  let result = 0;

  let product = 1;

  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];

    while (product >= k) {
      product /= nums[left];
      left += 1;
    }

    result += right - left + 1;
  }

  return result;
}

console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100));
