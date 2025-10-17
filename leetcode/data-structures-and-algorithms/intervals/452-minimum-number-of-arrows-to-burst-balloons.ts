// https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/

function findMinArrowShots(points: number[][]): number {
  // sort by end coordinate
  points.sort((a, b) => a[1] - b[1]);

  // shot into very first ballon
  let arrows = 1;
  let prev: number[] = points[0];
  for (let i = 1; i < points.length; i++) {
    let cur = points[i];
    // next ballon can be shot by prev's arrow
    if (prev[1] >= cur[0]) {
      // adjust aim radius
      // prev = [0, 6]
      // cur  = [3, 8]
      // to shot them both we have to aim to [3, 6]
      prev[0] = Math.max(prev[0], cur[0]);
    } else {
      // we cant shot cur balloon with prev's arrow
      // add another arrow
      arrows++;
      prev = cur;
    }
  }

  return arrows;
}
