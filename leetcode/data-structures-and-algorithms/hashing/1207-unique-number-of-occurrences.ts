import { strictEqual } from "assert";

// https://leetcode.com/problems/unique-number-of-occurrences/

// Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.

function uniqueOccurrences(arr: number[]): boolean {
  const occurencesCounter = new Map<number, number>();
  for (const num of arr) {
    occurencesCounter.set(num, (occurencesCounter.get(num) ?? 0) + 1);
  }

  return new Set(occurencesCounter.values()).size === occurencesCounter.size;
}

strictEqual(uniqueOccurrences([1, 2, 2, 1, 1, 3]), true);
strictEqual(uniqueOccurrences([1, 2]), false);
strictEqual(uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]), true);
