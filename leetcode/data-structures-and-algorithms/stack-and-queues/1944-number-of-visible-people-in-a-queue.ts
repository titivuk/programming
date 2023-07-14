import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/number-of-visible-people-in-a-queue/

function canSeePersonsCount(heights: number[]): number[] {
  const result: number[] = new Array(heights.length).fill(0);
  // store indexes of elements
  const decreasingStack: number[] = [];

  for (let i = 0; i < heights.length; i++) {
    while (
      decreasingStack.length > 0 &&
      heights[decreasingStack.at(-1) as number] < heights[i]
    ) {
      // if heights[i] is higher than the last item in the stack
      // the last item in the stack can see heights[i]
      // but cannot see anything else
      // so we pop the last item from the stack
      // and increase counter
      let index = decreasingStack.pop() as number;
      result[index] += 1;
    }

    // if there stack is not empty - it means the last item is bigger than heights[i]
    // in other words it can see heights[i]
    // so we increase its counter
    if (decreasingStack.length > 0) {
      result[decreasingStack.at(-1) as number] += 1;
    }

    decreasingStack.push(i);
  }

  return result;
}

deepStrictEqual(canSeePersonsCount([10, 6, 8, 5, 11, 9]), [3, 1, 2, 1, 1, 0]);
// deepStrictEqual(canSeePersonsCount([5, 1, 2, 3, 10]), [4, 1, 1, 1, 0]);
