// https://leetcode.com/problems/k-closest-points-to-origin/description/

import { PriorityQueue } from "@datastructures-js/priority-queue";

function kClosest(points: number[][], k: number): number[][] {
  // max heap
  // we could optimize a little and don't do Math.sqrt()
  // if a == b => a**2 == b**2
  const heap = new PriorityQueue<number[]>(
    (a: number[], b: number[]) => dist(b) - dist(a)
  );

  for (const p of points) {
    heap.push(p);

    while (heap.size() > k) {
      heap.pop();
    }
  }

  return heap.toArray();
}

function dist(a: number[]): number {
  return Math.sqrt(a[0] ** 2 + a[1] ** 2);
}
