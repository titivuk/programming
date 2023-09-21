// https://leetcode.com/problems/maximum-ice-cream-bars/description/

function maxIceCream(costs: number[], coins: number): number {
  costs.sort((a, b) => a - b);

  let counter = 0;
  while (counter < costs.length && costs[counter] <= coins) {
    coins -= costs[counter];
    counter += 1;
  }

  return counter;
}
