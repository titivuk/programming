// https://leetcode.com/problems/reachable-nodes-with-restrictions/description/

function reachableNodes(
  n: number,
  edges: number[][],
  restricted: number[]
): number {
  const graph: number[][] = [];
  const visited: boolean[] = [];

  for (let i = 0; i < n; i++) {
    graph[i] = [];
    visited[i] = false;
  }

  // mark restricted as visited so we won't visit them
  // and any vertice that connected to the graph through the restricted vertice
  // (unless it's connected by any other non-restricted vertice)
  for (const vertice of restricted) {
    visited[vertice] = true;
  }

  // create adjacency list
  for (const [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }

  function dfs(vertice: number) {
    visited[vertice] = true;

    let answer = 1;

    for (let i = 0; i < graph[vertice].length; i++) {
      if (visited[graph[vertice][i]] === false) {
        answer += dfs(graph[vertice][i]);
      }
    }

    return answer;
  }

  // start from 0
  return dfs(0);
}
