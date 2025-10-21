// https://leetcode.com/problems/sort-array-by-parity/description/

function sortArrayByParity(nums: number[]): number[] {
  // Easier version of https://leetcode.com/problems/sort-colors/

  // keep track where to put next even number
  let left = 0;

  let tmp = 0;
  for (let right = 0; right < nums.length; right++) {
    // even number found
    if (nums[right] % 2 === 0) {
      // swap it with the value on the left-th position
      tmp = nums[left];
      nums[left] = nums[right];
      nums[right] = tmp;

      // increment next even number position
      left++;
    }
  }

  return nums;
}
