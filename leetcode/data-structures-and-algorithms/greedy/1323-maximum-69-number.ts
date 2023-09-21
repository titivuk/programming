import { strictEqual } from "assert";

// https://leetcode.com/problems/maximum-69-number/description/

function maximum69Number(num: number): number {
  let digits = num.toString().split("");

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] === "6") {
      digits[i] = "9";
      break;
    }
  }

  return Number.parseInt(digits.join(""), 10);
}

strictEqual(maximum69Number(9669), 9969);
