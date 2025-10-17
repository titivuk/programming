// Given an array of meeting times intervals where intervals[i] = [start, end] indicates the i-th meeting runs from [start, end),
// determine if one person could attend all meetings.
// For example, given intervals = [[0, 30], [5, 10], [15, 20]], return false. If you attend the [0, 30] meeting, then you cannot attend the other two.

function canAttendMeetings(intervals: number[][]): boolean {
  // sort meetings by start time
  intervals.sort((a, b) => a[0] - b[0]);

  let prev = intervals[0];
  let cur: number[] = [];
  for (let i = 1; i < intervals.length; i++) {
    cur = intervals[i];
    // prev meeting ends after cur starts
    if (prev[1] > cur[0]) {
      return false;
    }
  }

  // no intersection between meetings
  return true;
}
