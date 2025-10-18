// https://leetcode.com/problems/merge-intervals/

function merge(intervals: number[][]): number[][] {
  // sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  let nonOverlapping: number[][] = [];

  let i = 0;
  while (i < intervals.length) {
    let cur = [...intervals[i]];

    let j = i + 1;
    while (j < intervals.length && isOverlap(cur, intervals[j])) {
      // update merged interval end
      // no need to update interval start, since intervals are sorted so cur[0] <= next[0]
      cur[1] = Math.max(cur[1], intervals[j][1]);
      j++;
    }

    nonOverlapping.push(cur);
    i = j;
  }

  return nonOverlapping;
}

// no need to check other conditions since interval are sorted by start
function isOverlap(i1: number[], i2: number[]): boolean {
  return i1[1] >= i2[0];
}

export {}
