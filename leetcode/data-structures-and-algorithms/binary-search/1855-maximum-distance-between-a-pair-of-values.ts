// https://leetcode.com/problems/maximum-distance-between-a-pair-of-values/

function maxDistance(nums1: number[], nums2: number[]): number {
  let left = 0,
    right = 0;

  // IDK how to apply binary search
  // figured out 2-pointers solution
  let maxDistance = 0;
  while (left < nums1.length && right < nums2.length) {
    if (nums1[left] <= nums2[right]) {
      maxDistance = Math.max(maxDistance, right - left);
    }

    if (nums1[left] > nums2[right]) {
      left += 1;
    } else {
      right += 1;
    }
  }

  return maxDistance;
}

maxDistance([30, 29, 19, 5], [25, 25, 25, 25, 25]);
