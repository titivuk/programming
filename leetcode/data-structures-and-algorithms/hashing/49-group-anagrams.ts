import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/group-anagrams/

// Given an array of strings strs, group the anagrams together. You can return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

function groupAnagramsKeyGen(strs: string[]): string[][] {
  // instead of sorting, generate key based on fixed size length alphabet
  function toStrId(s: string, alphabetParam: number[]) {
    for (let i = 0; i < s.length; i++) {
      alphabetParam[s.charCodeAt(i) - 97] += 1;
    }

    const id = alphabetParam.join(":");
    alphabetParam.fill(0);

    return id;
  }

  const map = new Map<string, string[]>();

  // reuse alphabet
  const alphabet = new Array(26).fill(0);
  for (const str of strs) {
    const strId = toStrId(str, alphabet);

    const group = map.get(strId) ?? [];
    group.push(str);
    map.set(strId, group);
  }

  return [...map.values()];
}

function groupAnagramsSort(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    const sortedStr = str.split("").sort().join();

    const group = map.get(sortedStr) ?? [];
    group.push(str);
    map.set(sortedStr, group);
  }

  return [...map.values()];
}

deepStrictEqual(
  groupAnagramsKeyGen(["eat", "tea", "tan", "ate", "nat", "bat"]),
  [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
);

deepStrictEqual(groupAnagramsKeyGen(["bdddddddddd", "bbbbbbbbbbc"]), [
  ["bdddddddddd"],
  ["bbbbbbbbbbc"],
]);

deepStrictEqual(groupAnagramsSort(["eat", "tea", "tan", "ate", "nat", "bat"]), [
  ["eat", "tea", "ate"],
  ["tan", "nat"],
  ["bat"],
]);

deepStrictEqual(groupAnagramsSort(["bdddddddddd", "bbbbbbbbbbc"]), [
  ["bdddddddddd"],
  ["bbbbbbbbbbc"],
]);
