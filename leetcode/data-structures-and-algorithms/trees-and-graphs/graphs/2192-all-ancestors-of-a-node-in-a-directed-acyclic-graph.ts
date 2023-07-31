// https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/

function getAncestors(n: number, edges: number[][]): number[][] {
  let answer: number[][] = [];
  let graph: number[][] = [];
  for (let i = 0; i < n; i++) {
    answer[i] = [];
    graph[i] = [];
  }

  // create graph
  for (const [from, to] of edges) {
    graph[from].push(to);
  }

  function dfs(vertex: number, startVertex: number) {
    for (const neighbor of graph[vertex]) {
      if (answer[neighbor].at(-1) !== startVertex) {
        // for every neighbor push startVertex from where you started
        // since we start from EVERY vertex it allows us to visit every vertex from every vertex
        answer[neighbor].push(startVertex);
        // pass startVertex further
        dfs(neighbor, startVertex);
      }
    }
  }

  // start DFS from every vertex
  // and also pass ancestor from where you started (2nd parameter)
  for (let i = 0; i < n; i++) {
    dfs(i, i);
  }

  return answer;
}

getAncestors(8, [
  [0, 3],
  [0, 4],
  [1, 3],
  [2, 4],
  [2, 7],
  [3, 5],
  [3, 6],
  [3, 7],
  [4, 6],
]);
