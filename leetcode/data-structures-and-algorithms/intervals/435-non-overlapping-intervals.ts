// https://leetcode.com/problems/non-overlapping-intervals/

function eraseOverlapIntervals(intervals: number[][]): number {
    // sort by end time ASC
    // the idea is to prefer interval with less end time
    // because the less end time the more time remaining for the other intervals
    intervals.sort((a, b) => a[1] - b[1]);

    let removed = 0;
    let prev = intervals[0];
    let cur: number[] = [];
    for (let i = 1; i < intervals.length; i++) {
        cur = intervals[i];
        // intervals intersected => remove cur (because its end time is bigger)
        if (prev[1] > cur[0]) {
            removed++;
        } else {
            // no intersection
            // make prev = cur
            // to check the next interval
            prev = cur;
        }
    }

    return removed;
};