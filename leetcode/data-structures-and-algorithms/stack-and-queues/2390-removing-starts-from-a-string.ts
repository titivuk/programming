import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/removing-stars-from-a-string/

// You are given a string s, which contains stars *.

// In one operation, you can:

// Choose a star in s.
// Remove the closest non-star character to its left, as well as remove the star itself.
// Return the string after all stars have been removed.

// Note:

// The input will be generated such that the operation is always possible.
// It can be shown that the resulting string will always be unique.

function removeStars(s: string): string {
  const stack: string[] = [];

  for (const char of s) {
    if (char === "*") {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack.join("");
}

deepStrictEqual(removeStars("leet**cod*e"), "lecoe");
deepStrictEqual(removeStars("erase*****"), "");
