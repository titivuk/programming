import { strictEqual } from "assert";

// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/705/hashing/4664/

// You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have.
// Each character in stones is a type of stone you have. You want to know how many of the stones you have are also jewels.

// Letters are case sensitive, so "a" is considered a different type of stone from "A".

function numJewelsInStonesUsingArray(jewels: string, stones: string): number {
  let result = 0;

  // uppercase and lowercase chars have 6 symbols between them in [91, 96] range
  // but I don't this that's a big deal, they will be all 0s
  // 26 - lower case, 26 - upper case, 6 - unused chars
  const alphabetPlus: number[] = new Array(26 + 26 + 6).fill(0);
  for (let i = 0; i < jewels.length; i++) {
    // we don't need counter so we can set just 1
    // mb we could use some lower level stuff and change bit from 0 to 1
    // but I'm too stupid to do that on the fly
    alphabetPlus[jewels.charCodeAt(i) - 65] = 1;
  }

  for (let i = 0; i < stones.length; i++) {
    if (alphabetPlus[stones.charCodeAt(i) - 65] === 1) {
      result += 1;
    }
  }

  return result;
}

function numJewelsInStonesUsingSet(jewels: string, stones: string): number {
  let result = 0;

  const jewelsSet = new Set(jewels);

  for (let i = 0; i < stones.length; i++) {
    if (jewelsSet.has(stones[i])) {
      result += 1;
    }
  }

  return result;
}

strictEqual(numJewelsInStonesUsingArray("aA", "aAAbbbb"), 3);
strictEqual(numJewelsInStonesUsingArray("z", "ZZ"), 0);

strictEqual(numJewelsInStonesUsingSet("aA", "aAAbbbb"), 3);
strictEqual(numJewelsInStonesUsingSet("z", "ZZ"), 0);
