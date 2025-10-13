// https://leetcode.com/problems/combinations/

function combine(n: number, k: number): number[][] {
  const result: number[][] = [];

  function backtrack(curr: number[], index: number) {
    if (curr.length === k) {
      result.push([...curr]);
      return;
    }

    for (let i = index; i <= n; i++) {
      curr.push(i);
      backtrack(curr, i + 1);
      curr.pop();
    }
  }

  backtrack([], 1);

  return result;
}
