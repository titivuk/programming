import { strictEqual } from "assert";

// https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/

// You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.
// We repeatedly make duplicate removals on s until we no longer can.
// Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.

function removeDuplicates(s: string): string {
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    if (stack.at(-1) === s[i]) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }

  return stack.join("");
}

strictEqual(removeDuplicates("abbaca"), "ca");
strictEqual(removeDuplicates("azxxzy"), "ay");
