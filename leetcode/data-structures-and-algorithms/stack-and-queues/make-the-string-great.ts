import { strictEqual } from "assert";

// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/706/stacks-and-queues/4611/

// Given a string s of lower and upper case English letters.

// A good string is a string which doesn't have two adjacent characters s[i] and s[i + 1] where:

// 0 <= i <= s.length - 2
// s[i] is a lower-case letter and s[i + 1] is the same letter but in upper-case or vice-versa.
// To make the string good, you can choose two adjacent characters that make the string bad and remove them. You can keep doing this until the string becomes good.

// Return the string after making it good. The answer is guaranteed to be unique under the given constraints.

// Notice that an empty string is also good.

function makeGood(s: string): string {
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    let prevCharCode = stack.at(-1)?.charCodeAt(0);
    if (
      prevCharCode === s.charCodeAt(i) + 32 ||
      prevCharCode === s.charCodeAt(i) - 32
    ) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }

  return stack.join("");
}

strictEqual(makeGood("leEeetcode"), "leetcode");
strictEqual(makeGood("abBAcC"), "");
strictEqual(makeGood("s"), "s");
strictEqual(makeGood("Pp"), "");
