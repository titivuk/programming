import { strictEqual } from "assert";

// https://leetcode.com/problems/backspace-string-compare/

// Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
// Note that after backspacing an empty text, the text will continue empty.

function backspaceCompare(s: string, t: string): boolean {
  const sStack: string[] = [],
    tStack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "#") {
      sStack.push(s[i]);
    } else {
      sStack.pop();
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (t[i] !== "#") {
      tStack.push(t[i]);
    } else {
      tStack.pop();
    }
  }

  if (sStack.length !== tStack.length) {
    return false;
  }

  for (let i = 0; i < sStack.length; i++) {
    if (sStack[i] !== tStack[i]) {
      return false;
    }
  }

  return true;
}

strictEqual(backspaceCompare("ab#c", "ad#c"), true);
strictEqual(backspaceCompare("ab##", "c#d#"), true);
strictEqual(backspaceCompare("a#c", "b"), false);
