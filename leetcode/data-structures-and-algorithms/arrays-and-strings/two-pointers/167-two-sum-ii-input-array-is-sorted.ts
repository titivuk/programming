// https://leetcode.com/problems/two-sum-ii-input-numbers-is-sorted/?envType=list&envId=e9snhf4h

function twoSum_two_pointer(numbers: number[], target: number): number[] {
  let left = 0,
    right = numbers.length - 1;

  let sum = 0;
  while (left < right) {
    sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1];
    }

    if (sum < target) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return [];
}

function twoSum_hash_map(numbers: number[], target: number): number[] {
  let map = new Map<number, number>();

  for (let i = 0; i < numbers.length; i++) {
    // check if we already saw num which gives numbers[i] + num = target
    // => num = target - numbers[i]
    let index = map.get(target - numbers[i]);

    if (typeof index === "number") {
      return [index + 1, i + 1];
    }

    map.set(numbers[i], i);
  }

  return [];
}
