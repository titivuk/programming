// Example 1: You are given a string s and an integer k.
// Find the length of the longest substring that contains at most k distinct characters.
// For example, given s = "eceba" and k = 2, return 3.
// The longest substring with at most 2 distinct characters is "ece".

import { strictEqual } from "assert";

function find(s: string, k: number): number {
  let result = 0;

  const windowCharSet = new Set<string>();

  let left = 0;
  for (let right = 0; right < s.length; right++) {
    windowCharSet.add(s[right]);

    while (windowCharSet.size > k) {
      windowCharSet.delete(s[left]);
      left++;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

strictEqual(find("eceba", 2), 3);
