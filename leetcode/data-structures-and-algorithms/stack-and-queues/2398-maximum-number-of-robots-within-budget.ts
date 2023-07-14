import { strictEqual } from "assert";

// https://leetcode.com/problems/get-equal-substrings-within-budget/

// You have n robots. You are given two 0-indexed integer arrays, chargeTimes and runningCosts, both of length n. The ith robot costs chargeTimes[i] units to charge and costs runningCosts[i] units to run. You are also given an integer budget.
// The total cost of running k chosen robots is equal to max(chargeTimes) + k * sum(runningCosts), where max(chargeTimes) is the largest charge cost among the k robots and sum(runningCosts) is the sum of running costs among the k robots.
// Return the maximum number of consecutive robots you can run such that the total cost does not exceed budget.

function maximumRobots(
  chargeTimes: number[],
  runningCosts: number[],
  budget: number
): number {
  let maxConsecutive = 0;

  // use decreasing dequeue which holds maximum chargeTime at 0-th index
  const decrDequeue: number[] = [];
  let windowRunningCost = 0;

  let left = 0;
  for (let right = 0; right < chargeTimes.length; right++) {
    while (
      decrDequeue.length > 0 &&
      (decrDequeue.at(-1) as number) < chargeTimes[right]
    ) {
      decrDequeue.pop();
    }

    decrDequeue.push(chargeTimes[right]);

    windowRunningCost += runningCosts[right];

    // apply sliding window approach and remove robots from the left until we fit the budget
    while (decrDequeue[0] + (right - left + 1) * windowRunningCost > budget) {
      // if removed left robot chargeTime = maximum charge time -> remove that as well from dequeue
      if (decrDequeue[0] === chargeTimes[left]) {
        // js have no queue/dequeue impl so remove from front is expensive :(
        decrDequeue.shift();
      }

      windowRunningCost -= runningCosts[left];
      left += 1;
    }

    maxConsecutive = Math.max(maxConsecutive, right - left + 1);
  }

  return maxConsecutive;
}

strictEqual(maximumRobots([3, 6, 1, 3, 4], [2, 1, 3, 4, 5], 25), 3);
strictEqual(maximumRobots([11, 12, 19], [10, 8, 7], 19), 0);
