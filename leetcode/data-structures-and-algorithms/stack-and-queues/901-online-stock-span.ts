import { strictEqual } from "assert";

// https://leetcode.com/problems/online-stock-span/description/

// The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
// You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.
// For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2.
// If there is no next greater element, then the answer for this query is -1.
// Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

class StockSpanner {
  // stack[i][0] - price
  // stack[i][1] - max number of consequtive days for that price
  private decreasingStack: Array<[number, number]> = [];

  constructor() {}

  next(price: number): number {
    let days = 1;

    // keep the stack monotonically decreasing
    while (
      this.decreasingStack.length > 0 &&
      this.decreasingStack[this.decreasingStack.length - 1][0] <= price
    ) {
      // for example, if stack looks like
      // (60, 1)
      // (70, 2)
      // (80, 1)
      // (100, 1)
      // and incoming price is 90
      // we start from the last element and move to the beginning
      // until we meet element with > 90 (we need CONSEQUTIVE days)
      // and summ all days and pop those elements
      days += this.decreasingStack.pop()![1];
    }

    // then we re-add the counted days + 1 and set with incoming price (90)
    // we do not care about lower price that we lost (60, 70, 80) because again we need CONSEQUTIVE days
    // if we keep them and, for example, next price is 80, the stack will look like this
    // (90, 1)
    // (60, 1) - unreachable
    // (70, 2) - unreachable
    // (80, 1) - unreachable
    // (100, 1)
    // values in the middle are unreachable because 90 > incoming price (80)
    // that's we merge them into one element
    this.decreasingStack.push([price, days]);

    return days;
  }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

const ss = new StockSpanner();
strictEqual(ss.next(100), 1);
strictEqual(ss.next(80), 1);
strictEqual(ss.next(60), 1);
strictEqual(ss.next(70), 2);
strictEqual(ss.next(60), 1);
strictEqual(ss.next(75), 4);
strictEqual(ss.next(85), 6);
