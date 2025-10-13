// https://leetcode.com/problems/combination-sum/

function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  // values are distinct and positive
  function backtrack(curr: number[], sum: number, index: number) {
    if (sum > target) {
      return;
    }

    if (sum === target) {
      result.push([...curr]);
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      curr.push(candidates[i]);
      // !!! we pass "i" instead of "i+1" because we are allowed to reuse the same candidate
      backtrack(curr, sum + candidates[i], i);
      curr.pop();
    }
  }

  backtrack([], 0, 0);

  return result;
}
