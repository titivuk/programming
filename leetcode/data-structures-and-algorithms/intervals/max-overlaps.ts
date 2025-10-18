function maxOverlaps(intervals: number[][]): number {
  const events: number[][] = intervals
    .flatMap(([start, end]) => [
      [start, 1],
      [end, -1],
    ])
    .sort((a, b) => {
      // if the same time
      // sort end before start
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }

      return a[0] - b[0];
    });

  let maxOverlaps = 0,
    startedIntervals = 0;
  for (const [time, type] of events) {
    startedIntervals += type;
    maxOverlaps = Math.max(maxOverlaps, startedIntervals);
  }

  return maxOverlaps;
}

export {};

console.log(
  maxOverlaps([
    [0, 10],
    [1, 3],
    [2, 6],
    [5, 8],
    [7, 12],
    [11, 15],
    [13, 18],
    [16, 20],
    [19, 25],
    [24, 30],
  ]),
);
