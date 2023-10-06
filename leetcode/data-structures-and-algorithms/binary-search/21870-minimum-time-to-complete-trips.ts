// https://leetcode.com/problems/minimum-time-to-complete-trips/

function minimumTime(time: number[], totalTrips: number): number {
  function check(minTime: number): boolean {
    let tripsMade = 0;

    for (let i = 0; i < time.length; i++) {
      tripsMade += Math.floor(minTime / time[i]);
    }

    return tripsMade >= totalTrips;
  }

  // on solution spaces problem
  // choose left to be mininmum possible required time
  // choose right to be maximum possible required time (can be chosen arbitrary or from constraints)
  let left = 1,
    right = time[0] * totalTrips,
    mid = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    // if it's possible to make totalTrips with mid time
    // try to make it with less time
    if (check(mid)) {
      right = mid - 1;
    }
    // if mid time is not enough -> increase time
    else {
      left = mid + 1;
    }
  }

  return left;
}
