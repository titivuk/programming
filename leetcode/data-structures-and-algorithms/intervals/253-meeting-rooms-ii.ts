type Interval = {
  start: number;
  end: number;
};

/**
 * @description Time - O(n^2), Space (O^n)
 */
function minMeetingRooms_first_implementation(intervals: Interval[]): number {
  if (intervals.length < 1) {
    return 0;
  }

  // sort meetings by start time
  intervals.sort((a, b) => a.start - b.start);

  // key - room
  // value - [earliest tart time, latest end time]
  let rooms: Interval[] = [{ ...intervals[0] }];

  let cur: Interval;
  for (let i = 1; i < intervals.length; i++) {
    cur = intervals[i];

    let r = 0;
    while (r < rooms.length) {
      // no intersection - we can schedule 'cur' meeting in 'room' room
      if (!isOverlap(rooms[r], cur)) {
        // remember
        //  - when first meeting starts
        //  - when latest meeting ends
        rooms[r].start = Math.min(rooms[r].start, cur.start);
        rooms[r].end = Math.max(rooms[r].start, cur.end);

        break;
      }

      r++;
    }

    // there is no room where we can schedule 'cur' meeting
    if (r === rooms.length) {
      rooms.push({ ...cur });
    }
  }

  return rooms.length;
}

/**
 * @description Sweep line algorithm
 */
function minMeetingRooms(intervals: Interval[]): number {
  if (intervals.length < 1) {
    return 0;
  }

  const events: { time: number; type: number }[] = intervals
    // create flat list of events
    .flatMap((int) => [
      { time: int.start, type: 1 },
      { time: int.end, type: -1 },
    ])
    // sort time ASX
    .sort((a, b) => {
      // if some meeting start at the same time as another ends
      // it's not overlap
      // so prioritize end time before start time
      if (a.time === b.time) {
        return a.type - b.type;
      }

      return a.time - b.time;
    });

  let answer = 0;
  let meetingsInProgress = 0;
  for (let i = 0; i < events.length; i++) {
    let point = events[i];

    meetingsInProgress += point.type;
    answer = Math.max(answer, meetingsInProgress);

    /**
     * DETAILED LOGIC
     */
    // // some meeting started
    // if (point.type === 1) {
    //   meetingsInProgress++;
    // }
    // // some meeting ended
    // else {
    //   answer = Math.max(answer, meetingsInProgress);
    //   meetingsInProgress--;
    // }
  }

  return answer;
}

function isOverlap(a: Interval, b: Interval): boolean {
  return a.start < b.end && b.start < a.end;
}

export {};

console.log(
  minMeetingRooms(
    [
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
    ].map(([start, end]) => ({ start, end })),
  ),
);
