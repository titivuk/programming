// https://leetcode.com/problems/fibonacci-number/

function fib(n: number): number {
  if (n < 2) return n;

  let prevprev = 0,
    prev = 1;
  let cur = 0;
  for (let i = 2; i <= n; i++) {
    cur = prev + prevprev;
    prevprev = prev;
    prev = cur;
  }

  return cur;
}

export {};
