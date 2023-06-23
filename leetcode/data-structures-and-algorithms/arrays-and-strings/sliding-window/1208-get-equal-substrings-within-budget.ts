// https://leetcode.com/problems/get-equal-substrings-within-budget/

import { strictEqual } from "assert";

// You are given two strings s and t of the same length and an integer maxCost.
// You want to change s to t. Changing the ith character of s t
// Return the maximum length of a substring of s that can be changed to be the same as the corresponding substring of t with a cost less than or equal to maxCost.
// If there is no substring from s that can be changed to its corresponding substring from t, return 0.

function equalSubstring(s: string, t: string, maxCost: number): number {
  let result = 0;

  let cost = 0;

  let left = 0;
  for (let right = 0; right < s.length; right++) {
    // add right value to the cast
    cost += Math.abs(s.charCodeAt(right) - t.charCodeAt(right));

    // adjust cost to be <= maxCost by redmoving elements from the left if needed
    while (cost > maxCost) {
      cost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
      left++;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

strictEqual(equalSubstring("abcd", "bcdf", 3), 3);
strictEqual(equalSubstring("abcd", "cdef", 3), 1);
strictEqual(equalSubstring("abcd", "acde", 0), 1);
