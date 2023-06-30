import { strictEqual } from "assert";

// https://leetcode.com/problems/permutation-in-string/

// Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
// In other words, return true if one of s1's permutations is the substring of s2.

function checkInclusion(s1: string, s2: string): boolean {
  const alphabet = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    alphabet[s1.charCodeAt(i) - 97] += 1;
  }

  let left = 0;
  for (let right = 0; right < s2.length; right++) {
    alphabet[s2.charCodeAt(right) - 97] -= 1;

    while (s1.length < right - left + 1) {
      alphabet[s2.charCodeAt(left) - 97] += 1;

      left += 1;
    }

    if (s1.length === right - left + 1) {
      // 26 iterations
      if (alphabet.every((counter) => counter === 0)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * @description its hard to measure JS but it's not faster than the solution above with nested 26 iterations loop according to leetcode results
 * mb it will be faster in actual language :)))
 */
function checkInclusionSlidingWindowOptimized(s1: string, s2: string): boolean {
  // immutable after we fill it with s1 data
  // used to determine which and how many chars we need overall
  const s1alphabet = new Array(26).fill(0);
  // mutable
  // keeps state for sliding window
  // used to determine which and how many chars we need at the time of check
  const s2alphabet = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    s2alphabet[s1.charCodeAt(i) - 97] += 1;
    // also adjust alphabet with data from the very 1st sliding window
    s2alphabet[s2.charCodeAt(i) - 97] -= 1;

    s1alphabet[s1.charCodeAt(i) - 97] += 1;
  }

  // how many chars are missing to build s1 from s2
  let missingCharsCounter = 0;
  for (let i = 0; i < s2alphabet.length; i++) {
    if (s2alphabet[i] > 0) {
      missingCharsCounter += s2alphabet[i];
    }
  }

  // all chars found
  if (missingCharsCounter === 0) {
    return true;
  }

  let left = 0;
  for (let right = s1.length; right < s2.length; right++) {
    // if char is required to build s1
    // and we still looking for that char
    // reduce the counter
    if (
      s1alphabet[s2.charCodeAt(right) - 97] > 0 &&
      s2alphabet[s2.charCodeAt(right) - 97] > 0
    ) {
      missingCharsCounter -= 1;
    }

    s2alphabet[s2.charCodeAt(right) - 97] -= 1;

    while (s1.length < right - left + 1) {
      // if char is required to build s1
      // and after removal it becomes missing
      // increase the counter
      if (
        s1alphabet[s2.charCodeAt(left) - 97] > 0 &&
        s2alphabet[s2.charCodeAt(left) - 97] >= 0
      ) {
        missingCharsCounter += 1;
      }

      s2alphabet[s2.charCodeAt(left) - 97] += 1;

      left += 1;
    }

    if (missingCharsCounter === 0) {
      return true;
    }
  }

  return false;
}

strictEqual(checkInclusion("ab", "eidbaooo"), true);
strictEqual(checkInclusion("ab", "eidboaoo"), false);
strictEqual(checkInclusion("adc", "dcda"), true);
strictEqual(checkInclusion("ky", "ainwkckifykxlribaypk"), true);

strictEqual(checkInclusionSlidingWindowOptimized("ab", "eidbaooo"), true);
strictEqual(checkInclusionSlidingWindowOptimized("ab", "eidboaoo"), false);
strictEqual(checkInclusionSlidingWindowOptimized("adc", "dcda"), true);
strictEqual(
  checkInclusionSlidingWindowOptimized("ky", "ainwkckifykxlribaypk"),
  true
);
strictEqual(
  checkInclusionSlidingWindowOptimized("hello", "ooolleoooleh"),
  false
);
