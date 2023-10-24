// https://leetcode.com/problems/sort-colors/

/**
 Do not return anything, modify nums in-place instead.
 MY SOLUTION
 */
function sortColors(nums: number[]): void {
  function swap(arr: number[], i: number, j: number) {
    let tmp = arr[i];

    arr[i] = arr[j];
    arr[j] = tmp;
  }

  // currIndex represents a position where we should put the next colour
  let currIndex: number = 0;

  // we don't actually need to check the last color
  // because when we order the 1st and the 2nd -> the third will be in the end of the array
  for (let color = 0; color < 2; color++) {
    // start from currIndex
    // all indices before occupied by previous colors
    for (let i = currIndex; i < nums.length; i++) {
      if (nums[i] === color) {
        swap(nums, currIndex, i);
        currIndex++;
      }
    }
  }
}

/**
 Do not return anything, modify nums in-place instead.
 https://en.wikipedia.org/wiki/Dutch_national_flag_problem
 */
function sortColors_dutch_partitioning_problem(nums: number[]): void {
  function swap(arr: number[], i: number, j: number) {
    let tmp = arr[i];

    arr[i] = arr[j];
    arr[j] = tmp;
  }

  let red = 0,
    white = 0,
    blue = nums.length - 1;

  // If the white pointer is red (nums[white] == 0), we swap with the red pointer and move both white and red pointer forward.
  // If the pointer is white (nums[white] == 1), the element is already in correct place, so we don't have to swap, just move the white pointer forward.
  // If the white pointer is blue, we swap with the latest unclassified element.
  while (white <= blue) {
    if (nums[white] === 0) {
      swap(nums, white, red);

      red += 1;
      white += 1;
    } else if (nums[white] === 1) {
      white += 1;
    } else {
      swap(nums, white, blue);

      blue -= 1;
    }
  }
}

// sortColors([2, 0, 2, 1, 1, 0]);
// sortColors([1, 1, 2]);
sortColors([0, 1]);
