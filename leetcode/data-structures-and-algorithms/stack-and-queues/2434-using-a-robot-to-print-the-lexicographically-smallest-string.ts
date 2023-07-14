import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string/

// You are given a string s and a robot that currently holds an empty string t. Apply one of the following operations until s and t are both empty:

// Remove the first character of a string s and give it to the robot. The robot will append this character to the string t.
// Remove the last character of a string t and give it to the robot. The robot will write this character on paper.

// Return the lexicographically smallest string that can be written on the paper.

function robotWithString(s: string): string {
  // since, the alphabet size is constant -> it's considered O(1) time complexity
  function smallestUnusedChar(alphabet: number[]): number {
    for (let i = 0; i < alphabet.length; i++) {
      if (alphabet[i] !== 0) return i + 97;
    }

    // alphabet starts from 97
    return 97;
  }

  // store frequency of each character
  const alphabet = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    alphabet[s.charCodeAt(i) - 97] += 1;
  }

  const t: string[] = [];
  const p: string[] = [];
  for (let i = 0; i < s.length; i++) {
    t.push(s[i]);

    alphabet[s.charCodeAt(i) - 97] -= 1;

    // start pushing to "p" only when there are NOT lexicographically smaller chars left
    while (
      t.length > 0 &&
      t[t.length - 1].charCodeAt(0) <= smallestUnusedChar(alphabet)
    ) {
      p.push(t.pop() as string);
    }
  }

  // empty stack if there are items left
  while (t.length !== 0) {
    p.push(t.pop() as string);
  }

  return p.join("");
}

// deepStrictEqual(robotWithString("zza"), "azz");
// deepStrictEqual(robotWithString("bac"), "abc");
deepStrictEqual(robotWithString("bdda"), "addb");
