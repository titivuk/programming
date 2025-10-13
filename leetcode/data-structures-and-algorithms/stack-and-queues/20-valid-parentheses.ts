import { strictEqual } from "assert";

// https://leetcode.com/problems/valid-parentheses/

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

function isValid(s: string): boolean {
  const stack: string[] = [];
  const dict = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (let i = 0; i < s.length; i++) {
    if (s[i] in dict) {
      stack.push(s[i]);
    } else {
      if (stack.length === 0) {
        return false;
      }

      let previousOpening = stack.pop() as keyof typeof dict;   

      if (s[i] !== dict[previousOpening]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

strictEqual(isValid("()"), true);
strictEqual(isValid("()[]{}"), true);
strictEqual(isValid("(]"), false);
