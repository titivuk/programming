import { strictEqual } from "assert";

// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/705/hashing/4661/

// Given an integer array arr, count how many elements x there are, such that x + 1 is also in arr.
// If there are duplicates in arr, count them separately.

function countElements(arr: number[]): number {
  let result = 0;

  const set = new Set<number>();
  for (let i = 0; i < arr.length; i++) {
    set.add(arr[i]);
  }

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i] + 1)) {
      result += 1;
    }
  }

  return result;
}

strictEqual(countElements([1, 2, 3]), 2);
strictEqual(countElements([1, 1, 3, 3, 5, 5, 7, 7]), 0);
