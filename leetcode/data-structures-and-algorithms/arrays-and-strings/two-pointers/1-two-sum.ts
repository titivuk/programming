// https://leetcode.com/problems/two-sum/description/

function twoSum(nums: number[], target: number): number[] {
  // create map
  // key - nums[i]
  // value - i
  const numsMap = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    let index = numsMap.get(target - nums[i]);

    if (typeof index === "number") {
      return [i, index];
    }

    // we can set values as we go because if, for example,
    // there is a pair [i, j] and for i j is not in the map yet
    // when we will check j - i will be already available
    // our solution also does not require any order, so [1, 0] ~ [0, 1]
    numsMap.set(nums[i], i);
  }

  return [-1, -1];
}
