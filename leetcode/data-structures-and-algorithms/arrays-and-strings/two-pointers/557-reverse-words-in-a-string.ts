// https://leetcode.com/problems/reverse-words-in-a-string-iii/

import { strictEqual } from "assert";

// Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

function reverseWordsWordVariable(s: string): string {
  let result = "";

  let left = s.length - 1;

  let reverseWord = "";
  while (left >= 0) {
    if (s[left] !== " ") {
      reverseWord += s[left];
    }

    if (s[left] === " " || left === 0) {
      if (s[left] === " ") {
        result = " " + reverseWord + result;
      } else {
        result = reverseWord + result;
      }

      reverseWord = "";
    }

    left -= 1;
  }

  return result;
}

/**
 * @description using two pointers
 */
function reverseWordsTwoPointers(s: string): string {
  let result = "";

  let lastSpaceIndex = -1;

  // left - index where word starts
  // right - index where word ends
  let left = 0,
    right = 0;
  for (let i = 0; i <= s.length; i++) {
    if (s[i] === " " || i === s.length) {
      // add space if lastSpaceIndex is known
      if (lastSpaceIndex !== -1) {
        result += " ";
      }

      left = lastSpaceIndex + 1;
      right = i - 1;

      // write word in reverse
      for (let j = right; j >= left; j--) {
        result += s[j];
      }

      lastSpaceIndex = i;
    }
  }

  return result;
}

/**
 * @description using two pointers
 * @description lowest performance. I wondering why... (no)
 */
function reverseWordsTwoPointersInPlace(s: string): string {
  // string is immutable in JS
  // so we need array to modify in-place
  const chars = s.split("");

  let lastSpaceIndex = -1;

  // left - index where word starts
  // right - index where word ends
  let left = 0,
    right = 0;
  for (let i = 0; i <= s.length; i++) {
    if (s[i] === " " || i === s.length) {
      left = lastSpaceIndex + 1;
      right = i - 1;

      while (left < right) {
        let tmp = s[left];
        chars[left] = chars[right];
        chars[right] = tmp;

        left++;
        right--;
      }

      lastSpaceIndex = i;
    }
  }

  return chars.join("");
}

strictEqual(reverseWordsTwoPointersInPlace("God Ding"), "doG gniD");

strictEqual(
  reverseWordsTwoPointersInPlace("Let's take LeetCode contest"),
  "s'teL ekat edoCteeL tsetnoc"
);

strictEqual(reverseWordsTwoPointers("God Ding"), "doG gniD");

strictEqual(
  reverseWordsTwoPointers("Let's take LeetCode contest"),
  "s'teL ekat edoCteeL tsetnoc"
);

strictEqual(reverseWordsWordVariable("God Ding"), "doG gniD");

strictEqual(
  reverseWordsWordVariable("Let's take LeetCode contest"),
  "s'teL ekat edoCteeL tsetnoc"
);
