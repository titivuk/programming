import { strictEqual } from "assert";

// https://leetcode.com/problems/custom-sort-string/

// You are given two strings order and s. All the characters of order are unique and were sorted in some custom order previously.
// Permute the characters of s so that they match the order that order was sorted. More specifically, if a character x occurs before a character y in order, then x should occur before y in the permuted string.
// Return any permutation of s that satisfies this property.

function customSortString(order: string, s: string): string {
  const sCharsArrMap = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    sCharsArrMap[s.charCodeAt(i) - 97] += 1;
  }

  let result = "";

  // add to result all chars from `s` that are in `order`
  // by iteration over `order` we guarantee correct order
  for (let i = 0; i < order.length; i++) {
    result += order[i].repeat(sCharsArrMap[order.charCodeAt(i) - 97]);
    sCharsArrMap[order.charCodeAt(i) - 97] = 0;
  }

  // append the rest of `s` characters not preserving initial order
  for (let i = 0; i < sCharsArrMap.length; i++) {
    result += String.fromCharCode(i + 97).repeat(sCharsArrMap[i]);
    sCharsArrMap[i] = 0;
  }

  return result;
}

strictEqual(customSortString("cba", "abcd"), "cbad");
strictEqual(customSortString("cbafg", "abcd"), "cbad");
strictEqual(customSortString("kqep", "pekeq"), "kqeep");
