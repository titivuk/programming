import { strictEqual } from "assert";

// https://leetcode.com/problems/first-letter-to-appear-twice/

// Given a string s consisting of lowercase English letters, return the first letter to appear twice.

function repeatedCharacter(s: string): string {
  const charSet = new Set<string>();

  for (let i = 0; i < s.length; i++) {
    if (charSet.has(s[i])) {
      return s[i];
    }

    charSet.add(s[i]);
  }

  return "";
}

strictEqual(repeatedCharacter("abccbaacz"), "c");
strictEqual(repeatedCharacter("abcdd"), "d");
