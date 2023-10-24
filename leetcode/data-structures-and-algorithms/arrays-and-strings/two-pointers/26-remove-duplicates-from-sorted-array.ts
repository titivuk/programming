// https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/?envType=list&envId=e9snhf4h

function removeDuplicates(nums: number[]): number {
  let i = 0,
    // keep track where to put next unique num
    k = 0;

  let num = 0;
  while (i < nums.length) {
    num = nums[i];
    nums[k] = num;

    // skip duplicates
    while (i < nums.length && nums[i] === num) {
      i++;
    }

    k++;
  }

  return k;
}

removeDuplicates([1, 1, 2]);
