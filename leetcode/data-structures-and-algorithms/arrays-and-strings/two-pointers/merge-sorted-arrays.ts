import assert from "node:assert";

/**
 * @description two pointers technique
 */
function mergeSortedArraysMyUglySolution(
  nums1: number[],
  nums2: number[]
): number[] {
  let result: number[] = [];

  let p1 = 0,
    p2 = 0;

  while (result.length !== nums1.length + nums2.length) {
    if (p1 === nums1.length) {
      result.push(nums2[p2]);
      p2++;
    } else if (p2 === nums2.length) {
      result.push(nums1[p1]);
      p1++;
    } else if (p1 < nums1.length && nums1[p1] <= nums2[p2]) {
      result.push(nums1[p1]);
      p1++;
    } else {
      result.push(nums2[p2]);
      p2++;
    }
  }

  return result;
}

/**
 * @description two pointers technique
 */
function mergeSortedArraysLeetCode(nums1: number[], nums2: number[]): number[] {
  let result: number[] = [];

  let p1 = 0,
    p2 = 0;

  // "main" loop iterates until one of the pointer reaches the end of the array
  while (p1 < nums1.length && p2 < nums2.length) {
    if (nums1[p1] <= nums2[p2]) {
      result.push(nums1[p1]);
      p1++;
    } else {
      result.push(nums2[p2]);
      p2++;
    }
  }

  // only one of that while loops actually work after while above
  while (p1 < nums1.length) {
    result.push(nums1[p1]);
    p1++;
  }

  while (p2 < nums2.length) {
    result.push(nums2[p2]);
    p2++;
  }

  return result;
}

assert.deepStrictEqual(
  mergeSortedArraysLeetCode([3, 5, 6], [1, 4, 7, 20]),
  [1, 3, 4, 5, 6, 7, 20]
);
