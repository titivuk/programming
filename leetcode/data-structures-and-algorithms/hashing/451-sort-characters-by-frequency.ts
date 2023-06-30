// https://leetcode.com/problems/sort-characters-by-frequency/

import { strictEqual } from "assert";

// Given a string s, sort it in decreasing order based on the frequency of the characters.
// The frequency of a character is the number of times it appears in the string.

// Return the sorted string. If there are multiple answers, return any of them.

function frequencySortUsingMap(s: string): string {
  let result = "";

  // alphabet array does not work because we have to sort map before the next step
  const frequencyMap = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    frequencyMap.set(s[i], (frequencyMap.get(s[i]) ?? 0) + 1);
  }

  // sort map entries by keys DESC and iterate over the sorted entries
  for (const [key, value] of [...frequencyMap.entries()].sort(
    (a, b) => b[1] - a[1]
  )) {
    result += key.repeat(value);
  }

  return result;
}

strictEqual(frequencySortUsingMap("tree"), "eetr");
strictEqual(frequencySortUsingMap("cccaaa"), "cccaaa");
strictEqual(frequencySortUsingMap("Aabb"), "bbAa");
