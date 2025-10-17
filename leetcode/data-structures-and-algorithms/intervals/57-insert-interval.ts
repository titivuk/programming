// https://leetcode.com/problems/insert-interval/description/

function insert(intervals: number[][], newInterval: number[]): number[][] {
  const overlappingIntervals: number[][] = [];
  // insert new interval in correct place
  let i = 0;
  while (i < intervals.length && intervals[i][0] < newInterval[0]) {
    overlappingIntervals.push(intervals[i]);
    i++;
  }
  overlappingIntervals.push(newInterval);
  while (i < intervals.length) {
    overlappingIntervals.push(intervals[i]);
    i++;
  }

  let result: number[][] = [];
  let prev = overlappingIntervals[0];
  let cur: number[];
  for (let i = 1; i < overlappingIntervals.length; i++) {
    cur = overlappingIntervals[i];

    if (isOverlap(prev, cur)) {
      prev[1] = Math.max(prev[1], cur[1]);
    } else {
      result.push(prev);
      prev = cur;
    }
  }
  result.push(prev);

  return result;
}

function isOverlap(i1: number[], i2: number[]): boolean {
  return i1[1] >= i2[0];
}
