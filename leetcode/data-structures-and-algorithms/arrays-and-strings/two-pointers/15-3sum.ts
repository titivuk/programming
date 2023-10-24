// https://leetcode.com/problems/3sum/description/?envType=list&envId=e9snhf4h

function threeSum(nums: number[]): number[][] {
  let answer: number[][] = [];

  // sort so we can skip duplicates
  nums.sort((a, b) => a - b);

  let target = 0,
    sum = 0;

  let left = 0,
    right = nums.length - 1;

  // fix the first number and use it as -target
  for (let t = 0; t < nums.length; t++) {
    // if we want num1 + num2 + num3 = 0
    // and we fix the first num1
    // then num2 + num3 = -num1 = target
    target = -nums[t];

    left = t + 1;
    right = nums.length - 1;

    while (left < right) {
      sum = nums[left] + nums[right];

      // increase sum by moving left pointer
      if (sum < target) {
        left += 1;
      }
      // reduce sum by moving right pointer
      else if (sum > target) {
        right -= 1;
      }
      // sum == target
      else {
        answer.push([nums[t], nums[left], nums[right]]);

        // skip values = nums[left]
        // since nums are sorted we can move left pointer until we reach next num
        while (left < right && nums[left] === answer[answer.length - 1][1])
          left++;
        // skip values = nums[right]
        // since nums are sorted we can move right pointer until we reach next num
        while (left < right && nums[right] === answer[answer.length - 1][2])
          right--;
      }
    }

    // skip values = nums[right]
    // since nums are sorted we can move target pointer until we reach next num
    while (t + 1 < nums.length && nums[t + 1] === nums[t]) t++;
  }

  return answer;
}

threeSum([-1, 0, 1, 2, -1, -4]);
// threeSum([0, 0, 0, 0]);
