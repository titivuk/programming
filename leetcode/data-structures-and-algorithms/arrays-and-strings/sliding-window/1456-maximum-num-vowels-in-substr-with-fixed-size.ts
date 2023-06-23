// https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/

import { strictEqual } from "assert";

function maxVowels(s: string, k: number): number {
  let result = 0;

  const vowels = ["a", "e", "i", "o", "u"];
  function isVowel(char: string) {
    return vowels.includes(char);
  }

  // calculate number of vowels for the first windows
  let windowVowelsCount = 0;
  for (let i = 0; i < k; i++) {
    if (isVowel(s[i])) {
      windowVowelsCount++;
    }
  }

  result = windowVowelsCount;

  // start from very first char after the 1st window
  // if excluded char from the left is vowel - decrement counter
  // if included char from the right is vowel - increment counter
  for (let i = k; i < s.length; i++) {
    if (isVowel(s[i - k])) {
      windowVowelsCount--;
    }

    if (isVowel(s[i])) {
      windowVowelsCount++;
    }

    result = Math.max(result, windowVowelsCount);
  }

  return result;
}

strictEqual(maxVowels("abciiidef", 3), 3);
strictEqual(maxVowels("aeiou", 2), 2);
strictEqual(maxVowels("leetcode", 3), 2);
strictEqual(maxVowels("tryhard", 4), 1);
