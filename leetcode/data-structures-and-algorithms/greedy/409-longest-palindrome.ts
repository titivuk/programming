// https://leetcode.com/problems/longest-palindrome/

import { strictEqual } from "assert";

function longestPalindrome(s: string): number {
  // in palindrome only one char with even frequency allowed
  // so we count every char frequency and take odd number of chars
  // if we see that single character left - we set "odd" = 1 and then add it to the answer
  // this is exactly one allowed char with even frequency

  // A - 65
  // z - 122
  const charsFrequency = new Array(122 - 65 + 1).fill(0);

  for (let i = 0; i < s.length; i++) {
    charsFrequency[s.charCodeAt(i) - 65] += 1;
  }

  let answer = 0;
  let odd = 0;
  let charsToAdd = 0;
  for (const frequency of charsFrequency) {
    charsToAdd = 2 * Math.floor(frequency / 2);
    answer += charsToAdd;

    if (frequency - charsToAdd > 0) {
      odd = 1;
    }
  }

  return answer + odd;
}

strictEqual(longestPalindrome("bb"), 2);
