// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/705/hashing/4601/

import { strictEqual } from "assert";

// A pangram is a sentence where every letter of the English alphabet appears at least once.
// Given a string sentence containing only lowercase English letters, return true if sentence is a pangram, or false otherwise.

function checkIfPangram(sentence: string): boolean {
  return new Set(sentence).size >= 26;
}

strictEqual(checkIfPangram("thequickbrownfoxjumpsoverthelazydog"), true);
strictEqual(checkIfPangram("leetcode"), false);
