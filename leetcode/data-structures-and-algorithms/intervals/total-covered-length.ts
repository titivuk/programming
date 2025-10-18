function totalCoveredLength(intervals: number[][]): number {
  const events: number[][] = intervals
    .flatMap(([start, end]) => [
      [start, 1],
      [end, -1],
    ])
    // depending on open/closed intervals it might be important to sort end before start if point(time) is the same (a[0] == b[0])
    .sort((a, b) => a[0] - b[0]);

  let coveredLength = 0;
  let startedIntervals = 0;
  let start = Number.MAX_SAFE_INTEGER;
  for (const [pos, type] of events) {
    startedIntervals += type;

    if (type === 1) {
      start = Math.min(start, pos);
    } else if (startedIntervals === 0) {
      coveredLength += pos - start;
      start = Number.MAX_SAFE_INTEGER;
    }
  }

  return coveredLength;
}

export {};

console.log(
  totalCoveredLength([
    [1, 4],
    [2, 6],
    [8, 10],
  ]),
); // 7
console.log(
  totalCoveredLength([
    [1, 3],
    [3, 5],
  ]),
); // 4
console.log(
  totalCoveredLength([
    [1, 2],
    [2, 3],
    [3, 4],
  ]),
); // 3
