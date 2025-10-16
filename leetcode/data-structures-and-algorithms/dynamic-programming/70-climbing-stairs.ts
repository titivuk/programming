// https://leetcode.com/problems/climbing-stairs/description/

function climbStairs(n: number): number {
  const cache: number[] = [];
  function backtrack(i: number): number {
    if (i === n) {
      return 1;
    }

    if (i > n) {
      return 0;
    }

    let r1 = 0;
    if (typeof cache[i + 1] === "number") {
      r1 = cache[i + 1];
    } else {
      r1 = backtrack(i + 1);
      cache[i + 1] = r1;
    }

    let r2 = 0;
    if (typeof cache[i + 2] === "number") {
      r2 = cache[i + 2];
    } else {
      r2 = backtrack(i + 2);
      cache[i + 2] = r2;
    }

    return r1 + r2;
  }

  return backtrack(1) + backtrack(2);
}

export {};
