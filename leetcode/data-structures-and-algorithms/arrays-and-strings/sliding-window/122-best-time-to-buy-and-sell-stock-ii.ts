// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/

function maxProfit(prices: number[]): number {
  let answer = 0;

  let minPrice = Number.POSITIVE_INFINITY;
  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i - 1] < minPrice) {
      minPrice = prices[i - 1];
    }

    // sell stock on hold
    if (i === prices.length - 1 || prices[i] > prices[i + 1]) {
      answer += Math.max(prices[i] - minPrice, 0);
      minPrice = Number.POSITIVE_INFINITY;
    }
  }

  return answer;
}

function maxProfit_leetcode(prices: number[]): number {
  let answer = 0;

  for (let i = 1; i < prices.length; i += 1) {
    // we are looking for monothonical sequences
    // 1 2 3 4 5 4 3 2 1 4 can be split into several parts
    // 1 2 3 4 5  |  4 3 2  | 1 4
    //    incr        decr    incr
    // profit(a <= b <= c <= d) = d - a = (b - a) + (c - b) + (d - c)
    if (prices[i] > prices[i - 1]) {
      answer += prices[i] - prices[i - 1];
    }
  }

  return answer;
}

// maxProfit([7, 1, 5, 3, 6, 4]);
// maxProfit([1, 2, 3, 4, 5]);
maxProfit([7, 6, 4, 3, 1]);
