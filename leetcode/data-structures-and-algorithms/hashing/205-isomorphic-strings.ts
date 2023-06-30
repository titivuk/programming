// https://leetcode.com/problems/isomorphic-strings/

import { strictEqual } from "assert";

// Given two strings s and t, determine if they are isomorphic.
// Two strings s and t are isomorphic if the characters in s can be replaced to get t.
// All occurrences of a character must be replaced with another character while preserving the order of characters.
// No two characters may map to the same character, but a character may map to itself.

function isIsomorphic(s: string, t: string): boolean {
  const charsMapping = new Map<string, string>();
  const usedChars = new Set<string>();

  let sChar: string | undefined;
  for (let i = 0; i < t.length; i++) {
    sChar = charsMapping.get(t[i]);

    if (sChar) {
      if (sChar !== s[i]) {
        return false;
      }
    } else {
      if (usedChars.has(s[i])) {
        return false;
      }

      charsMapping.set(t[i], s[i]);
      usedChars.add(s[i]);
    }
  }

  return true;
}

function isIsomorphicTwoMaps(s: string, t: string): boolean {
  const asciiMapping = new Array(256).fill(0);
  const asciiInverseMapping = new Array(256).fill(0);

  for (let i = 0; i < t.length; i++) {
    if (
      asciiMapping[s.charCodeAt(i)] !== asciiInverseMapping[t.charCodeAt(i)]
    ) {
      return false;
    }

    asciiMapping[s.charCodeAt(i)] = i + 1;
    asciiInverseMapping[t.charCodeAt(i)] = i + 1;
  }

  return true;
}

strictEqual(isIsomorphic("egg", "add"), true);
strictEqual(isIsomorphic("foo", "bar"), false);
strictEqual(isIsomorphic("paper", "title"), true);
strictEqual(isIsomorphic("badc", "baba"), false);

strictEqual(isIsomorphicTwoMaps("egg", "add"), true);
strictEqual(isIsomorphicTwoMaps("foo", "bar"), false);
strictEqual(isIsomorphicTwoMaps("paper", "title"), true);
strictEqual(isIsomorphicTwoMaps("badc", "baba"), false);
