// https://leetcode.com/problems/maximum-running-time-of-n-computers/

function maxRunTime(n: number, batteries: number[]): number {
  function check(time: number) {
    let charge = 0;

    // not sure if I fully understand it
    // if battery has charge > required, you cannot use that "extra" charge
    // because the battery powers computer and single battery can only power single computer at a time
    // from the other hand, you can use more batteries than computers and their charges < required in the following way
    // for n computers, pick n largest batteries lb
    // charge time = min(lb)
    // other extra batteries will be used to swap main batteries in order to not exhaust them and always rotate

    // Example

    // time | [ 9, 13, 13, 17, 20 ]
    //    1 | [ 9, 12, 12, 16, 19 ]
    //    2 | [ 9, 11, 11, 15, 18 ]
    //    3 | [ 9, 10, 10, 14, 17 ]
    //    4 | [ 9, 9,  9,  13, 16 ]
    //    5 | [ 9, 8,  8,  12, 15 ]
    //    // We'll always use N biggest batteries hence we try to distribute extra battery
    //    // among lowest ones till they can be made equal to max possible battery among top N batteries.
    //    6 | [ 8, 8,  7,  11, 14 ]
    //    7 | [ 7, 7,  7,  10, 13 ]
    //    8 | [ 7, 6,  6,  9,  12 ]
    //    9 | [ 6, 6,  5,  8,  11 ]
    //   10 | [ 5, 5,  5,  7,  10 ]
    //   11 | [ 5, 4,  4,  6,  9 ]
    //   12 | [ 4, 4,  3,  5,  8 ]
    //   13 | [ 3, 3,  3,  4,  7 ]
    //   14 | [ 3, 2,  2,  3,  6 ]
    //   15 | [ 2, 2,  1,  2,  5 ]
    //   16 | [ 1, 1,  1,  1,  4 ]
    //   17 | [ 1, 0,  0,  0,  3 ]
    // Note that I'm coming from right side and picking up top N batteries on every minute.
    // you'll observe than only the 1st, 2nd, and 3rd batteries are being rotated whereas 4th and 5th are always connected to 3rd and 4th computer.
    // The rotation implies that extra battery ( 1st one ) can be used in place of 2nd or 3rd battery when needed to maximise the running time
    // and hence we distribute it evenly among 2nd and 3rd battery ( i.e least 2 batteries among top N batteries )

    for (let i = 0; i < batteries.length; i++) {
      // If a battery batteries[i] has more power than the total running time,
      // there is no way we can use its excess power to further increase the running time.
      // Therefore, once we have picked the largest n batteries and assign them to n computers,
      // these batteries are tied to their computer and swapping them does not bring any longer running time.
      charge += Math.min(time, batteries[i]);
    }

    return charge >= time * n;
  }

  let totalCharge = 0;
  for (let i = 0; i < batteries.length; i++) {
    totalCharge += batteries[i];
  }

  let left = 0,
    right = Math.floor(totalCharge / n),
    mid = 0;

  let answer = 0;
  while (left < right) {
    mid = Math.floor((left + right + 1) / 2);

    if (check(mid)) {
      answer = mid;

      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

maxRunTime(2, [3, 3, 3]);
