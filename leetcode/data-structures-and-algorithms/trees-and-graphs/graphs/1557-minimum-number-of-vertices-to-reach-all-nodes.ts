// https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/description/

// Given a directed acyclic graph, with n vertices numbered from 0 to n-1, and an array edges where edges[i] = [fromi, toi] represents a directed edge from node fromi to node toi.
// Find the smallest set of vertices from which all nodes in the graph are reachable. It's guaranteed that a unique solution exists.
// Notice that you can return the vertices in any order.

function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
  // !!!
  // the smallest set of vertices from which all nodes in the graph are reachable
  // in other words, the smallest set of nodes that cannot be reached from other nodes
  // !!!

  const indegree = new Array(n).fill(0);

  // calculate indegree for every vertice
  for (const [x, y] of edges) {
    indegree[y] += 1;
  }

  let answer = [];
  for (let i = 0; i < n; i++) {
    // if indegree === 0, i.e. no edges go to the vertice
    // then it's unreachable
    if (indegree[i] == 0) {
      answer.push(i);
    }
  }

  return answer;
}
