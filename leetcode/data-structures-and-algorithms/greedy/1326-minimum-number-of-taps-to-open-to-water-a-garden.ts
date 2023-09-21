// https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/

function minTaps(n: number, ranges: number[]): number {
  let taps: number[][] = ranges
    .map((range, i) => {
      return [i, range];
    })
    // sort by left edge DESC
    // if left edges are equal
    // sort by radius ASC
    // NOTE: actually ordering should be exactly opposite, but we start from the end to use array like a stack and use .pop() operation
    .sort((a, b) => {
      let aRadius = a[0] - a[1];
      let bRadius = b[0] - b[1];

      let aLeftEdge = Math.max(aRadius, 0);
      let bLeftEdge = Math.max(bRadius, 0);

      if (aLeftEdge === bLeftEdge) {
        return a[1] - b[1];
      }

      return bLeftEdge - aLeftEdge;
    });

  let answer = 0;
  let i = 0;
  while (taps.length > 0 && i < n) {
    let tap: number[] = [-1, -1];

    // if i-th garden point covered by the current tap
    // or i-th garden point behind the current tap (out of radius from the left)
    while (
      taps.length > 0 &&
      (Math.abs(taps[taps.length - 1][0] - i) <= taps[taps.length - 1][1] ||
        i > taps[taps.length - 1][0] + taps[taps.length - 1][1])
    ) {
      // remove current tap from the stack and
      let currTap = taps.pop()!;

      // save current tap in the "tap" variable if its radius bigger than current "tap" variable
      if (currTap[0] + currTap[1] >= tap[0] + tap[1]) {
        tap = currTap;
      }
    }

    // if no tap found that covers i-th garden point
    // immediately return -1
    if (tap[1] === -1) {
      return -1;
    }

    answer += 1;
    // set next garned point that is not yet covered by taps
    i = tap[0] + tap[1];
  }

  return answer;
}

function minTaps_leetcode(n: number, ranges: number[]): number {
  // for every position calculate maximum reachable point
  // maxReach[i] - maximum reachable point from position i
  let maxReach: number[] = new Array(n).fill(0);

  for (let i = 0; i < ranges.length; i++) {
    let start = Math.max(0, i - ranges[i]);
    let end = Math.min(n, i + ranges[i]);

    maxReach[start] = Math.max(maxReach[start], end);
  }

  // Number of taps used
  let answer = 0;
  // Current rightmost position reached
  let currEnd = 0;
  // Next rightmost position that can be reached
  let nextEnd = 0;

  for (let i = 0; i <= n; i++) {
    // current position is not reachable
    if (i > nextEnd) {
      return -1;
    }

    // curr tap does not cover i position anymore
    // so we have to add another tap (increment answer)
    // and added tap "works" until nextEnd incl. (update currEnd)
    if (i > currEnd) {
      answer += 1;
      currEnd = nextEnd;
    }

    nextEnd = Math.max(nextEnd, maxReach[i]);
  }

  return answer;
}

minTaps(5, [3, 4, 1, 1, 0, 0]);
