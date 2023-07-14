import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/

// You are given an integer array prices where prices[i] is the price of the ith item in a shop.

// There is a special discount for items in the shop. If you buy the ith item, then you will receive a discount equivalent to prices[j] where j is the minimum index such that j > i and prices[j] <= prices[i]. Otherwise, you will not receive any discount at all.

// Return an integer array answer where answer[i] is the final price you will pay for the ith item of the shop, considering the special discount.

function finalPrices(prices: number[]): number[] {
  const result = [...prices];

  // the stack keep price indexes
  // by storing indexes we know position on price and having the position we can get value
  const increasingStack: number[] = [];

  for (let i = 0; i < prices.length; i++) {
    // iterate over prices
    // the first price <= of the last price in stack - discount for every item currently in the stack
    while (
      increasingStack.length > 0 &&
      prices[increasingStack[increasingStack.length - 1]] >= prices[i]
    ) {
      // that's why we store indexes - to know to which position apply the discount
      result[increasingStack[increasingStack.length - 1]] -= prices[i];
      increasingStack.pop();
    }

    increasingStack.push(i);
  }

  return result;
}

deepStrictEqual(finalPrices([8, 4, 6, 2, 3]), [4, 2, 4, 2, 3]);
deepStrictEqual(finalPrices([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
deepStrictEqual(finalPrices([10, 1, 1, 6]), [9, 0, 1, 6]);
