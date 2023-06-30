import { strictEqual } from "assert";

// https://leetcode.com/problems/determine-if-two-strings-are-close/

// WHAT MY STUPID HEAD COULD FIGURE OUT
// In order to be close, strings have to be:
// 1. the same length
// 2. characters frequency must be the same
//    for example, cabbba -> 1 character has frequency = 1 (с)
//                           1 character has frequency = 2 (b)
//                           1 character has frequency = 3 (a)
//                 abbccc -> 1 character has frequency = 1 (a)
//                           1 character has frequency = 2 (b)
//                           1 character has frequency = 3 (c)
// we don't actually care about what characters have what frequency, because characters can be swapped between each other
// in other words, we can make "a" have frequency of "c" and then "c" have frequency of "a".

// so we need to check strings length and count/sort chars by frequency

function closeStrings(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) {
    return false;
  }

  const len = word1.length;
  const alphabet1: number[] = new Array(26).fill(0);
  const alphabet2: number[] = new Array(26).fill(0);

  for (let i = 0; i < len; i++) {
    alphabet1[word1.charCodeAt(i) - 97] += 1;
    alphabet2[word2.charCodeAt(i) - 97] += 1;
  }

  // key - frequency, value - number of characters
  const word1Map = new Map<number, number>();
  const word2Map = new Map<number, number>();

  for (let i = 0; i < 26; i++) {
    // if character is in string "word1" but missing in string "word1" and vice versa
    if (
      (alphabet1[i] > 0 && alphabet2[i] === 0) ||
      (alphabet2[i] > 0 && alphabet1[i] === 0)
    ) {
      return false;
    }

    // get frequency and count how many chars have it
    if (alphabet1[i] > 0) {
      word1Map.set(alphabet1[i], (word1Map.get(alphabet1[i]) ?? 0) + 1);
    }

    // get frequency and count how many chars have it
    if (alphabet2[i] > 0) {
      word2Map.set(alphabet2[i], (word2Map.get(alphabet2[i]) ?? 0) + 1);
    }
  }

  // if number of characters with frequncy "key" not equal to number of characters with the same frequecny in anothr string
  // strings are not close
  for (const [key, value] of word1Map) {
    if (value !== word2Map.get(key)) {
      return false;
    }
  }

  return true;
}

function closeStringsWithConstantSort(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) {
    return false;
  }

  const len = word1.length;
  const alphabet1: number[] = new Array(26).fill(0);
  const alphabet2: number[] = new Array(26).fill(0);

  for (let i = 0; i < len; i++) {
    alphabet1[word1.charCodeAt(i) - 97] += 1;
    alphabet2[word2.charCodeAt(i) - 97] += 1;
  }

  for (let i = 0; i < 26; i++) {
    // if character is in string "word1" but missing in string "word1" and vice versa
    if (
      (alphabet1[i] > 0 && alphabet2[i] === 0) ||
      (alphabet2[i] > 0 && alphabet1[i] === 0)
    ) {
      return false;
    }
  }

  // it's still considered O(n) because alphabet size is contant and always = 26
  // here, instead of creating another maps, we just sort alphabets by frequency
  alphabet1.sort((a, b) => a - b);
  alphabet2.sort((a, b) => a - b);

  // and after soring, if the frequency are the same, values on the positions should be the same
  for (let i = 0; i < alphabet1.length; i++) {
    if (alphabet1[i] !== alphabet2[i]) {
      return false;
    }
  }

  return true;
}

strictEqual(closeStrings("abc", "bca"), true);
strictEqual(closeStrings("a", "aa"), false);
strictEqual(closeStrings("cabbba", "abbccc"), true);
