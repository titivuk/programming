// https://leetcode.com/problems/single-element-in-a-sorted-array/

function singleNonDuplicate(nums: number[]): number {
  let left = 0,
    right = nums.length - 1,
    mid = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    // use NaN if we move out of array borders
    // because it always returns false when compared
    let leftNeighbour = mid - 1 >= 0 ? nums[mid - 1] : Number.NaN,
      rightNeighbour = mid + 1 < nums.length ? nums[mid + 1] : Number.NaN;

    // we found value if it does not equal to any neighbour
    if (leftNeighbour !== nums[mid] && nums[mid] !== rightNeighbour) {
      return nums[mid];
    }

    /**
     * if branching is pretty hard to understand in comparison with other solutuions
     * but it is what it is... too stupid for better?
     */

    // check if nums[mid] is the 2nd integer in the pair
    if (nums[mid] === leftNeighbour) {
      // the 2nd integer in the pair has even index if unique integer is on the left side
      // otherwise - index is odd
      if (mid % 2 === 0) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // nums[mid] is the 1st integer in the pair
    else {
      // the 1st integer in the pair has odd index if unique integer is on the left side
      if (mid % 2 === 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return nums[left];
}

/**
 * try to refactor the solution above
 */
function singleNonDuplicate_V2(nums: number[]): number {
  let left = 0,
    right = nums.length - 1,
    mid = 0;

  while (left < right) {
    mid = Math.floor((left + right) / 2);

    // the 1st integer in the pair should be at the EVEN index
    // if the left side has only pairs

    // always choose the 1st integer in the pair
    if (mid % 2 === 1) {
      mid -= 1;
    }

    // check if there is a pair
    // if no - it means that rule mentioned above is violated (even/odd indexes)
    // it can be violited if there is a integer without pair on the left side
    if (nums[mid] !== nums[mid + 1]) {
      right = mid;
    }
    // if the rule is not violated -> single integer on the right side
    // move left pointer (+2 because +1 is the 2nd integer in the pair)
    else {
      left = mid + 2;
    }
  }

  return nums[left];
}

function singleNonDuplicate_GIGA_BIT_STUFF(nums: number[]): number {
  let left = 0,
    right = nums.length - 1,
    mid = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    // 0 has pair with 1  0^1 = 1
    // 1 has pair with 0  1^1 = 0

    // 2 has pair with 3  2^1 = 3
    // 3 has pair with 2  3^1 = 2

    // 4 has pair with 5  4^1 = 5
    // 5 has pair with 4  5^1 = 4

    // ...
    // ...

    // XOR (^) calculates correct pair for the given mid
    // the rule can be violated if there is a integer without pair on the left side
    // in this case we go the left
    if (nums[mid] !== nums[mid ^ 1]) {
      right = mid - 1;
    }
    // the rule is not violated -> go to the right
    else {
      left = mid + 1;
    }
  }

  return nums[left];
}

singleNonDuplicate_V2([1, 1, 2, 3, 3, 4, 4, 8, 8]);
// singleNonDuplicate([3, 3, 7, 7, 10, 11, 11]);
// singleNonDuplicate([1, 1, 2]);
