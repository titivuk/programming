// https://leetcode.com/problems/minimum-speed-to-arrive-on-time/

function minSpeedOnTime(dist: number[], hour: number): number {
  // if there are trains more than hours
  // it's not possible to ride them all 1 by 1
  if (dist.length > Math.ceil(hour)) {
    return -1;
  }

  function check(speed: number): boolean {
    let totalSpent = 0;

    // calc every train except the last one
    // because we do not need to wait the next train (round an hour)
    for (let i = 0; i < dist.length - 1; i++) {
      totalSpent += Math.ceil(dist[i] / speed);
    }

    totalSpent += dist[dist.length - 1] / speed;

    return totalSpent <= hour;
  }

  let left = 1,
    // we can pick arbitrary number, but problem constraints say that the answer is not greater than 10e7
    right = 10e7;

  let mid = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    if (check(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

minSpeedOnTime([1, 3, 2], 1.9);
