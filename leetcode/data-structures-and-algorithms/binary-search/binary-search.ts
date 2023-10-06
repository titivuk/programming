function binarySearch(arr: number[], target: number): number {
  let left = 0,
    right = arr.length - 1;

  let mid = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (target === arr[mid]) {
      // do something
      return mid;
    }

    if (target < arr[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  // target is not in the arr, but left is the insertion point
  return left;
}

function findValueIndexOrInsertionIndex(
  nums: number[],
  target: number
): number {
  let left = 0,
    right = nums.length - 1;
  let mid = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (target > nums[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
