// https://leetcode.com/problems/find-if-path-exists-in-graph/description/

// There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive).
// The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi.
// Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.
// You want to determine if there is a valid path that exists from vertex source to vertex destination.
// Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

function validPath(
  n: number,
  edges: number[][],
  source: number,
  destination: number
): boolean {
  const visited: boolean[] = [];
  // instead of map use array
  const graph: number[][] = [];
  for (let i = 0; i < n; i++) {
    visited[i] = false;
    graph[i] = [];
  }
  for (const [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }

  function dfs(vertice: number): boolean {
    visited[vertice] = true;

    // if we reached the destination
    // does not make sense to go further
    if (vertice === destination) {
      return true;
    }

    for (const adjacentVertice of graph[vertice]) {
      if (visited[adjacentVertice] === false) {
        // if any recursion step returned true
        // then destination was found
        // return result to the caller immediately
        if (dfs(adjacentVertice)) {
          return true;
        }
      }
    }

    return false;
  }

  // start DFS from source
  return dfs(source);
}
