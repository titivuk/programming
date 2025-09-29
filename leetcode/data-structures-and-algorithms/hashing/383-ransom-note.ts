import { strictEqual } from "assert";

// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/705/hashing/4607/

// Given two strings ransomNote and magazine,
// return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

// Each letter in magazine can only be used once in ransomNote.

function canConstruct(ransomNote: string, magazine: string): boolean {
  // create alphabet availability using fixed size array with O(1) access using char codes
  const alphabet: number[] = new Array(26).fill(0);
  for (let i = 0; i < magazine.length; i++) {
    alphabet[magazine.charCodeAt(i) - 97] += 1;
  }

  // check every ransom note character availability in alphabet
  for (let i = 0; i < ransomNote.length; i++) {
    // if character is not available - immediately return false
    if (alphabet[ransomNote.charCodeAt(i) - 97] === 0) {
      return false;
    }

    // reduce availability by 1
    alphabet[ransomNote.charCodeAt(i) - 97] -= 1;
  }

  return true;
}

strictEqual(canConstruct("a", "b"), false);
strictEqual(canConstruct("aa", "ab"), false);
strictEqual(canConstruct("aa", "aab"), true);
