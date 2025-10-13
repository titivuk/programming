// https://leetcode.com/problems/last-stone-weight/description/

import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

function lastStoneWeight(stones: number[]): number {
  const heap = new MaxPriorityQueue<number>();
  for (const s of stones) {
    heap.push(s);
  }

  while (heap.size() > 1) {
    const y = heap.pop();
    const x = heap.pop();

    if (y !== x) {
      heap.push(y - x);
    }
  }

  if (heap.size() > 0) {
    return heap.front();
  }

  return 0;
}
