import { strictEqual } from "assert";

// https://leetcode.com/problems/smallest-string-with-a-given-numeric-value/description/

function getSmallestString(n: number, k: number): string {
  let result: string[] = [];

  while (k > 0 && result.length < n) {
    // calculate number of available slots on the right side
    let rightSideLength = n - result.length - 1;

    // try to set all 'z' on the right side and see whether we can still reach "k"
    let charNumericValue = k - rightSideLength * 26;
    // if charNumericValue <= 0 it means that we can set any char to the same position, so we set the smallest one - 'a'
    // otherwise we are obliged to set character with value = charNumericValue in order to reach "k"
    if (charNumericValue <= 0) {
      charNumericValue = 1;
    }

    // convert char code to char
    result.push(String.fromCharCode(97 + charNumericValue - 1));

    // subtract the symbol we just added from the target string numeric value
    k -= charNumericValue;
  }

  return result.join("");
}

strictEqual(getSmallestString(5, 73), "aaszz");
