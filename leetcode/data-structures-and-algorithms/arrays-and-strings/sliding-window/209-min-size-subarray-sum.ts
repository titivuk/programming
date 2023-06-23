import { strictEqual } from "assert";

function minSubArrayLen(target: number, nums: number[]): number {
  let result = 0;

  let left = 0;
  let sum = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    // subtract from sum until the result is >= target
    while (sum - nums[left] >= target) {
      sum -= nums[left];
      left += 1;
    }

    // if sum still bigger than target
    // set length if it's less than already in result (unless it's 0)
    if (sum >= target) {
      if (result === 0) {
        result = right - left + 1;
      } else {
        result = Math.min(result, right - left + 1);
      }
    }
  }

  return result;
}

strictEqual(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]), 2);
strictEqual(minSubArrayLen(4, [1, 4, 4]), 1);
strictEqual(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]), 0);
strictEqual(minSubArrayLen(11, [1, 2, 3, 4, 5]), 3);
