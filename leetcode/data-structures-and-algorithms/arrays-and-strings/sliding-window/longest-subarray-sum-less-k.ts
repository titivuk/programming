// Given an array of positive integers nums and an integer k,
// find the length of the longest subarray whose sum is less than or equal to k.

function longestSubArraySumLessK(arr: number[], k: number) {
  let result = 0;
  let sum = 0;
  let left = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];

    while (sum > k) {
      sum -= arr[left];
      left += 1;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

// longestSubArraySumLessK([3, 1, 2, 7, 4, 2, 1, 1, 5], 8);

console.log(longestSubArraySumLessK([3, 1, 2, 7, 4, 2, 1, 1, 5], 8));
