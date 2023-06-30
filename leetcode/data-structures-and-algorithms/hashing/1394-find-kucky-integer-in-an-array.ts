import { strictEqual } from "assert";

// https://leetcode.com/problems/find-lucky-integer-in-an-array/

// Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value.

// Return the largest lucky integer in the array. If there is no lucky integer return -1.

function findLucky(arr: number[]): number {
  const map = new Map<number, number>();

  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i], (map.get(arr[i]) ?? 0) + 1);
  }

  let result = -1;
  for (const [key, value] of map) {
    if (key === value) {
      result = Math.max(result, key);
    }
  }

  return result;
}

strictEqual(findLucky([2, 2, 3, 4]), 2);
strictEqual(findLucky([1, 2, 2, 3, 3, 3]), 3);
strictEqual(findLucky([2, 2, 2, 3, 3]), -1);
