import { strictEqual } from "assert";

// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/705/hashing/4690/

// Given a string s, find the length of the longest substring without repeating characters.

function lengthOfLongestSubstring(s: string): number {
  let result = 0;

  // alphabet array can be used instead
  let windowCharSet = new Set<string>();

  let left = 0;
  for (let right = 0; right < s.length; right++) {
    windowCharSet.add(s[right]);

    while (right - left + 1 !== windowCharSet.size) {
      // remove left char from set
      // s[left] === s[right] then do not remove, since s[right] should be in the set
      if (s[left] !== s[right]) {
        windowCharSet.delete(s[left]);
      }

      left += 1;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

strictEqual(lengthOfLongestSubstring("abcabcbb"), 3);
strictEqual(lengthOfLongestSubstring("bbbbb"), 1);
strictEqual(lengthOfLongestSubstring("pwwkew"), 3);
