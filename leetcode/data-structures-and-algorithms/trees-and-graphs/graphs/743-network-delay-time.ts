import { MinPriorityQueue } from "@datastructures-js/priority-queue";

function networkDelayTime(times: number[][], n: number, k: number): number {
  const minQueue = new MinPriorityQueue<number[]>({
    compare: (a: number[], b: number[]) => a[1] - b[1],
  });

  const visited = new Array(n).fill(false);

  // key - source node
  // value - [target node, time]
  const adjacencyList: number[][][] = Array.from({ length: n }, () => []);
  for (const [source, target, time] of times) {
    adjacencyList[source].push([target, time]);
  }

  let minTime = 0;
  minQueue.enqueue([k, 0]);
  while (minQueue.size() > 0) {
    const [node, time] = minQueue.dequeue();

    visited[node] = true;
    minTime += time;

    const neighbors = adjacencyList[node];
    console.log(neighbors);
    for (const [nb, nbTime] of neighbors) {
      if (!visited[nb]) {
        minQueue.enqueue([nb, time + nbTime]);
      }
    }
  }

  if (visited.some((v) => !v)) {
    return -1;
  }

  return minTime;
}

export {};
