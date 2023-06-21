// Given an integer array nums and an integer k,
// find the sum of the subarray with the largest sum whose length is k.

function find(nums: number[], size: number): number {
  let result = 0;

  let sum = 0;

  // build first windows sum
  for (let i = 0; i < size; i++) {
    sum += nums[i];
  }
  result = sum;

  for (let right = size; right < nums.length; right++) {
    // start build 2th, 3th ... windows by adding next right element and removing very left element
    sum += nums[right];
    sum -= nums[right - size];

    result = Math.max(result, sum);
  }

  return result;
}

console.log(find([3, -1, 4, 12, -8, 5, 6], 4));
