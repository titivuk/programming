// https://leetcode.com/problems/container-with-most-water/?envType=list&envId=e9snhf4h

function maxArea(height: number[]): number {
  // The widest container (using first and last line) is a good candidate, because of its width. Its water level is the height of the smaller one of first and last line.
  // All other containers are less wide and thus would need a higher water level in order to hold more water.
  // The smaller one of first and last line doesn't support a higher water level and can thus be safely removed from further consideration.

  // two-pointers technique
  let left = 0;
  let right = height.length - 1;

  let answer = 0;

  // check lines until pointers meet each other
  while (left < right) {
    answer = Math.max(
      answer,
      // calculate area by choosing the line with the smallest height
      Math.min(height[left], height[right]) * (right - left)
    );

    // move pointer which point to the line with the smallest height
    if (height[left] < height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return answer;
}
