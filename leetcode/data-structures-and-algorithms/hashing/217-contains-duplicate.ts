import { strictEqual } from "assert";

// https://leetcode.com/problems/contains-duplicate/

// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

function containsDuplicate(nums: number[]): boolean {
  return nums.length > new Set(nums).size;
}

strictEqual(containsDuplicate([1, 2, 3, 1]), true);
strictEqual(containsDuplicate([1, 2, 3, 4]), false);
strictEqual(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]), true);
