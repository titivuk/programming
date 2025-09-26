import { strictEqual } from "assert";

function findCycleInDirectedGraph(v: number, edges: number[][]): boolean {
  const adjacencyList: number[][] = Array.from({ length: v }, () => []);
  for (let [from, to] of edges) {
    adjacencyList[from].push(to);
  }

  const visited: boolean[] = new Array(v).fill(false);
  const stack: boolean[] = new Array(v).fill(false);

  for (let i = 0; i < v; i++) {
    if (!visited[i] && isCyclic(i, adjacencyList, visited, stack)) {
      return true;
    }
  }

  return false;
}

function isCyclic(
  v: number,
  adjacencyList: number[][],
  visited: boolean[],
  stack: boolean[]
) {
  if (stack[v]) return true;
  if (visited[v]) return false;

  stack[v] = true;
  visited[v] = true;

  const children = adjacencyList[v];
  for (const ch of children) {
    if (isCyclic(ch, adjacencyList, visited, stack)) {
      return true;
    }
  }

  stack[v] = false;
}

strictEqual(
  findCycleInDirectedGraph(4, [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 0],
    [2, 3],
  ]),
  true
);

strictEqual(
  findCycleInDirectedGraph(4, [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 3],
  ]),
  false
);
