import { strictEqual } from "assert";

// https://leetcode.com/problems/number-of-recent-calls/

// You have a RecentCounter class which counts the number of recent requests within a certain time frame.

// Implement the RecentCounter class:

// RecentCounter() Initializes the counter with zero recent requests.
// int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t].
// It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.

class RecentCounter {
  private requests: number[] = [];

  ping(t: number): number {
    this.requests.push(t);

    let index = 0;
    while (t - 3000 > this.requests[index]) {
      index++;
    }

    if (index > 0) {
      this.requests.splice(0, index);
    }

    return this.requests.length;
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

const obj = new RecentCounter();

strictEqual(obj.ping(1), 1);
strictEqual(obj.ping(100), 2);
strictEqual(obj.ping(3001), 3);
strictEqual(obj.ping(3002), 3);
