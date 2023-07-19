// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/description/

// You have a graph of n nodes. You are given an integer n and an graph edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.
// Return the number of connected components in the graph.

// similar with 547 but need to create graph from edges
function countComponents(n: number, edges: number[][]): number {
  const visited: boolean[] = [];
  // instead of map use graph
  const graph: number[][] = [];
  for (let i = 0; i < n; i++) {
    visited[i] = false;
    graph[i] = [];
  }
  for (const [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }

  function dfs(vertice: number) {
    visited[vertice] = true;

    for (const adjacentVertice of graph[vertice]) {
      if (visited[adjacentVertice] === false) {
        dfs(adjacentVertice);
      }
    }
  }

  let answer = 0;
  // iterate over every vertice
  for (let i = 0; i < graph.length; i++) {
    // if vertice is not visited it means that it does not belong to any previously checked component
    // so we increament answer
    // and do dfs starting from that vertice
    if (visited[i] === false) {
      answer += 1;
      dfs(i);
    }
  }

  return answer;
}
