import { strictEqual } from "assert";

// https://leetcode.com/problems/check-if-all-characters-have-equal-number-of-occurrences/

// Given a string s, return true if s is a good string, or false otherwise.
// A string s is good if all the characters that appear in s have the same number of occurrences (i.e., the same frequency).

function areOccurrencesEqual(s: string): boolean {
  const map = new Map<string, number>();

  for (let i = 0; i < s.length; i++) {
    let counter = map.get(s[i]);
    if (typeof counter === "number") {
      map.set(s[i], counter + 1);
    } else {
      map.set(s[i], 1);
    }
  }

  const goodCounter = map.get(s[0]) as number;
  for (const value of map.values()) {
    if (value !== goodCounter) {
      return false;
    }
  }

  return true;
}

strictEqual(areOccurrencesEqual("abacbc"), true);
strictEqual(areOccurrencesEqual("aaabb"), false);
