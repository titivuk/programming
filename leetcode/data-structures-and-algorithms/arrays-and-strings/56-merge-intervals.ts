function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);

  const result: number[][] = [];
  let i = 0;
  while (i < intervals.length) {
    // merged interval. start value is intervals[i]
    let cur = intervals[i];
    let j = i + 1;
    // iterate over intervals until no overlap found
    // works because intervals are sorted
    while (j < intervals.length && isOverlapping(cur, intervals[j])) {
      // update merged interval borders with min start and max end
      cur[0] = Math.min(cur[0], intervals[j][0]);
      cur[1] = Math.max(cur[1], intervals[j][1]);

      j++;
    }

    i = j;

    result.push(cur);
  }

  return result;
}

function isOverlapping(i1: number[], i2: number[]): boolean {
  // since intervals are sorted, we care only about case
  //   [        (       ]          )
  // i1[0]    i2[0]   i1[1]      i2[1]
  return i2[0] <= i1[1];
}
