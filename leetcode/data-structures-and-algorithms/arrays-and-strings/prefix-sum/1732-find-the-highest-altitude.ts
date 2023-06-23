// There is a biker going on a road trip.
// The road trip consists of n + 1 points at different altitudes.
// The biker starts his trip on point 0 with altitude equal 0.
// You are given an integer array gain of length n
// where gain[i] is the net gain in altitude between points i​​​​​​ and i + 1 for all (0 <= i < n).
// Return the highest altitude of a point.

import { strictEqual } from "assert";

function largestAltitude(gain: number[]): number {
  let result = 0;

  let accum = 0;

  for (let i = 0; i < gain.length; i++) {
    accum += gain[i];
    result = Math.max(result, accum);
  }

  return result;
}

strictEqual(largestAltitude([-5, 1, 5, 0, -7]), 1);
strictEqual(largestAltitude([-4, -3, -2, -1, 4, 3, 2]), 0);
