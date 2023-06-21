import { strictEqual } from "assert";

/**
 * @description two pointers technique
 */
function isSubsequence(seq: string, target: string) {
  let s = 0,
    t = 0;

  while (s < seq.length && t < target.length) {
    // if seq[s] found in target string, check seq[s+1]
    if (seq.charAt(s) === target.charAt(t)) {
      s++;
    }

    t++;
  }

  return s === seq.length;
}

strictEqual(isSubsequence("abc", "ahbgdc"), true);
strictEqual(isSubsequence("axc", "ahbgdc"), false);
