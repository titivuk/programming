// https://leetcode.com/problems/satisfiability-of-equality-equations/

/**
 * Having equation in form of "a==b" ("a" can be equal to "b")
 * Solution consists of 2 parts
 *  1. Build graph based on equality operator "=="
 *  2. For every equation with operator "!=" try to find path from "a" to "b" traversing equality graph.
 *     If path is found -> equations contradict each other -> return false
 * @returns
 */
function equationsPossible(equations: string[]): boolean {
  // build graph using array and char codes
  let equalityGraph: number[][] = [];
  for (let i = 0; i < 26; i++) {
    equalityGraph[i] = [];
  }
  for (const eq of equations) {
    if (eq.charAt(1) === "=") {
      equalityGraph[eq.charCodeAt(0) - 97].push(eq.charCodeAt(3) - 97);
      equalityGraph[eq.charCodeAt(3) - 97].push(eq.charCodeAt(0) - 97);
    }
  }

  // vertex = (charCode of letter - 97) which points to equalityGraph and visited arrays
  // targetVertex = (charCode of letter - 97)
  // function returns true if path found
  function dfs(vertex: number, targetVertex: number, visited: boolean[]) {
    visited[vertex] = true;

    // if targetVertex found - return true
    if (vertex === targetVertex) {
      return true;
    }

    for (const neighbor of equalityGraph[vertex]) {
      if (visited[neighbor] === false) {
        // propagate true if targetVertex was found somewhere deeper
        if (dfs(neighbor, targetVertex, visited)) {
          return true;
        }
      }
    }

    return false;
  }

  for (const eq of equations) {
    if (eq.charAt(1) === "!") {
      let visited = new Array<boolean>(26).fill(false);
      // if target vertex found
      // it means that there is a situation where a == b and also a != b
      if (dfs(eq.charCodeAt(0) - 97, eq.charCodeAt(3) - 97, visited)) {
        return false;
      }
    }
  }

  return true;
}

equationsPossible(["c==c", "b==d", "x!=z"]);
