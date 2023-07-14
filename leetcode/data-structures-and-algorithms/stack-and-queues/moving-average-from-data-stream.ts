import { strictEqual } from "assert";

// https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/706/stacks-and-queues/4703/

// Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

// Implement the MovingAverage class:

// MovingAverage(int size) Initializes the object with the size of the window size.
// double next(int val) Returns the moving average of the last size values of the stream.

class MovingAverage {
  private nums: number[] = [];

  constructor(private size: number) {}

  next(val: number): number {
    this.nums.push(val);

    let deleteCount = 0;
    while (this.nums.length - deleteCount > this.size) {
      deleteCount += 1;
    }

    if (deleteCount > 0) {
      this.nums.splice(0, deleteCount);
    }

    let sum = 0;
    for (const num of this.nums) {
      sum += num;
    }

    return sum / this.nums.length;
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

const obj = new MovingAverage(3);

strictEqual(obj.next(1), 1);
strictEqual(obj.next(10), 5.5);
strictEqual(obj.next(4), 5);
strictEqual(obj.next(7), 7);
