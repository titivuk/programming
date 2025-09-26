// https://leetcode.com/problems/minimum-window-substring/

import { strictEqual } from "assert/strict";

function minWindow(s: string, t: string): string {
  // positive value means we need that number of chars
  // zero value means we fulfilled all char occurences
  // negative value means we have more chars than we need
  const charCounter = new Map<string, number>();
  for (let ch of t) {
    charCounter.set(ch, (charCounter.get(ch) ?? 0) + 1);
  }

  let ans = "";
  let ansLen = Number.POSITIVE_INFINITY;
  let tLen = t.length;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    // we found another required char
    const rCounter = charCounter.get(s[right]) ?? 0;
    if (rCounter > 0) {
      tLen--;
    }
    // update char counter
    charCounter.set(s[right], rCounter - 1);

    // all chars are in [left, right] window
    // lets try to reduce the window
    if (tLen === 0) {
      while (true) {
        // we don't need to check if it exists, since left index has been already processed before
        // so it MUST be there
        // which means that 0 can be only in one situation:
        //  the chars we don't need will always have negative values
        //  the chars we need might be 0 or positive
        //  so zero means s[left] is required to fulfill one of t's char
        const lCounter = charCounter.get(s[left])!;
        // we can't remove s[left], its one of "t" required chars
        // >= also works
        // but since we check it only when tLen == 0
        // i.e. tLen != 0 when any t's char counter > 0
        if (lCounter === 0) {
          break;
        }

        charCounter.set(s[left], lCounter + 1);
        left++;
      }

      if (ansLen > right - left + 1) {
        ansLen = right - left + 1;
        ans = s.substring(left, right + 1);
      }
    }
  }

  return ans;
}

// strictEqual(minWindow("ADOBECODEBANC", "ABC"), "BANC");
strictEqual(minWindow("ADOBECODEBANC", "AAA"), "BANC");
