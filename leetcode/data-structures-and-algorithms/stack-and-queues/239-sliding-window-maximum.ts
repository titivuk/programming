import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/sliding-window-maximum/

// You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right.
// You can only see the k numbers in the window. Each time the sliding window moves right by one position.

// Return the max sliding window.

function maxSlidingWindow(nums: number[], k: number): number[] {
  // JS does not have double-ended queue data structure
  // ideally the data structure should allows us add/remove from the right and remove from the left for O(1)
  // but it's not the case for js array :(
  const deque: number[] = [];
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    // maintain monotonic decreasing.
    // if all elements in the deque smaller than the current one
    // then get rid of them
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // all indexes in the current windows should be in (i - k, i] or [i - k + 1, i] so window length = k
    if (deque[0] === i - k) {
      deque.shift();
    }

    // start push when the very 1st window is checked
    // and the next iteration will change the window
    if (i + 1 >= k) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

deepStrictEqual(
  maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3),
  [3, 3, 5, 5, 6, 7]
);
// deepStrictEqual(maxSlidingWindow([1], 1), [1]);
