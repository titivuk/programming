// https://leetcode.com/problems/permutations/description/

function permute(nums: number[]): number[][] {
  const result: number[][] = [];

  function backtrack(curr: number[]) {
    if (curr.length === nums.length) {
      result.push([...curr]);
      return;
    }

    for (const n of nums) {
      // we always start from the 0th element
      // so we should not push the same element twice
      // eg [1, 2, 3]
      //        |
      //   starting pos
      // [2] -> [2, 1] -> <skip 2> -> [2, 1 ,3]
      if (!curr.includes(n)) {
        curr.push(n);
        backtrack(curr);
        curr.pop();
      }
    }
  }

  backtrack([]);

  return result;
}
