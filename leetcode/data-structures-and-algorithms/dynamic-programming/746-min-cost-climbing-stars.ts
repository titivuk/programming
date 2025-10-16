// https://leetcode.com/problems/min-cost-climbing-stairs/description/

function minCostClimbingStairs(cost: number[]): number {
  const cache: Map<number, number> = new Map();
  const n = cost.length;

  function dp(i: number): number {
    // we start from 0th or 1st step for free
    if (i < 2) {
      return 0;
    }

    if (cache.has(i)) {
      return cache.get(i)!;
    }

    const minCost = Math.min(dp(i - 1) + cost[i - 1], dp(i - 2) + cost[i - 2]);

    cache.set(i, minCost);

    return minCost;
  }

  // since we can make 1 or 2 steps
  // we need to be at most 2 steps away from finish: (n-1) or (n-2)
  // and to make a move we have to pay a cost of a step
  return Math.min(dp(n - 1) + cost[n - 1], dp(n - 2) + cost[n - 2]);
}
