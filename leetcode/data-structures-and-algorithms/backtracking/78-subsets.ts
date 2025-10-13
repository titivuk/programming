// https://leetcode.com/problems/subsets/

function subsets(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(nums: number[], subset: number[], idx: number): void {
    result.push([...subset]);

    for (let i = idx; i < nums.length; i++) {
      subset.push(nums[i]);
      backtrack(nums, subset, i + 1);
      subset.pop();
    }
  }

  backtrack(nums, [], 0);

  return result;
}
