// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

function maxProfit(prices: number[]): number {
  let answer = 0;

  let leftMin = Number.POSITIVE_INFINITY;
  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i - 1] < leftMin) {
      leftMin = prices[i - 1];
    }

    answer = Math.max(answer, prices[i] - leftMin);
  }

  return answer;
}

maxProfit([7, 1, 5, 3, 6, 4]);
