import { MinPriorityQueue } from "@datastructures-js/priority-queue";

export function minCostConnectPoints(points: number[][]): number {
  const n = points.length;
  const minQueue = new MinPriorityQueue<number[]>({
    compare: (a, b) => a[1] - b[1],
  });
  const visited = new Array(n).fill(false);
  let totalCost = 0;
  let nodesConnected = 0;

  // no cost for start node
  minQueue.enqueue([0, 0]);

  while (nodesConnected < n) {
    const [node, cost] = minQueue.dequeue();

    if (visited[node]) continue;
    visited[node] = true;

    totalCost += cost;
    nodesConnected++;

    for (let nb = 0; nb < n; nb++) {
      if (!visited[nb]) {
        const cost =
          Math.abs(points[nb][0] - points[node][0]) +
          Math.abs(points[nb][1] - points[node][1]);

        minQueue.enqueue([nb, cost]);
      }
    }
  }

  return totalCost;
}

console.log(
  minCostConnectPoints([
    [3, 12],
    [-2, 5],
    [-4, 1],
  ])
);
