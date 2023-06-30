import { strictEqual } from "assert";

// https://leetcode.com/problems/word-pattern/

// Given a pattern and a string s, find if s follows the same pattern.
// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.

function wordPattern(pattern: string, s: string): boolean {
  let left = 0;

  let map = new Map<string, string>();
  let usedChars = new Set<string>();

  let word = "";
  let wordIndex = 0;

  for (let right = 0; right < s.length; right++) {
    if (s[right] !== " ") {
      word += s[right];
    }

    if (s[right] === " " || right === s.length - 1) {
      const char = map.get(word);

      if (char) {
        if (pattern[wordIndex] !== char) {
          return false;
        }
      } else if (usedChars.has(pattern[wordIndex])) {
        return false;
      } else {
        map.set(word, pattern[wordIndex]);
        usedChars.add(pattern[wordIndex]);
      }

      left = right + 1;
      wordIndex += 1;

      word = "";
    }
  }

  if (wordIndex !== pattern.length) {
    return false;
  }

  return true;
}

function wordPatternWithSplit(pattern: string, s: string): boolean {
  let map = new Map<string, string>();
  let usedChars = new Set<string>();

  const words = s.split(" ");

  if (words.length !== pattern.length) {
    return false;
  }

  for (let i = 0; i < words.length; i++) {
    const char = map.get(words[i]);

    if (char) {
      if (pattern[i] !== char) {
        return false;
      }
    } else if (usedChars.has(pattern[i])) {
      return false;
    } else {
      map.set(words[i], pattern[i]);
      usedChars.add(pattern[i]);
    }
  }

  return true;
}

function wordPatternWithSplitSingleMap(pattern: string, s: string): boolean {
  let map = new Map<string, number>();

  const words = s.split(" ");

  if (words.length !== pattern.length) {
    return false;
  }

  for (let i = 0; i < words.length; i++) {
    if (map.get(words[i]) !== map.get(`_${pattern[i]}`)) {
      return false;
    }

    map.set(words[i], i + 1);
    map.set(`_${pattern[i]}`, i + 1);
  }

  return true;
}

strictEqual(wordPattern("abba", "dog cat cat dog"), true);
strictEqual(wordPattern("abba", "dog cat cat fish"), false);
strictEqual(wordPattern("aaaa", "dog cat cat dog"), false);

strictEqual(wordPatternWithSplit("abba", "dog cat cat dog"), true);
strictEqual(wordPatternWithSplit("abba", "dog cat cat fish"), false);
strictEqual(wordPatternWithSplit("aaaa", "dog cat cat dog"), false);

strictEqual(wordPatternWithSplitSingleMap("abba", "dog cat cat dog"), true);
strictEqual(wordPatternWithSplitSingleMap("abba", "dog cat cat fish"), false);
strictEqual(wordPatternWithSplitSingleMap("aaaa", "dog cat cat dog"), false);
