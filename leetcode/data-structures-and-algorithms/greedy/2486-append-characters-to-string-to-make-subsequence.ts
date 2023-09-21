// https://leetcode.com/problems/append-characters-to-string-to-make-subsequence/description/

function appendCharacters(s: string, t: string): number {
  // use two pointers technique
  let sPointer = 0,
    tPointer = 0;

  while (sPointer < s.length && tPointer < t.length) {
    // if char of t found in s
    // increment tPointer to check next char of t
    if (s[sPointer] === t[tPointer]) {
      tPointer += 1;
    }

    // on every iteration move over s
    sPointer += 1;
  }

  // the answer in the number of t chars that was not found in s
  // if we did not iterate over t char - it was not found
  return t.length - tPointer;
}
