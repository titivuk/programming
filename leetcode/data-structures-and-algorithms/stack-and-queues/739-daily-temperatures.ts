import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/backspace-string-compare/

// Given an array of integers temperatures represents the daily temperatures,
// return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.
// If there is no future day for which this is possible, keep answer[i] == 0 instead.

function dailyTemperatures(temperatures: number[]): number[] {
  const stack: number[] = [];
  const result: number[] = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i += 1) {
    while (
      stack.length > 0 &&
      temperatures[stack[stack.length - 1]] < temperatures[i]
    ) {
      let j = stack.pop() as number;
      result[j] = i - j;
    }

    stack.push(i);
  }

  return result;
}

deepStrictEqual(
  dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]),
  [1, 1, 4, 2, 1, 1, 0, 0]
);
deepStrictEqual(dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0]);
deepStrictEqual(dailyTemperatures([30, 60, 90]), [1, 1, 0]);
