// https://leetcode.com/problems/clone-graph/

class _Node {
  val: number;
  neighbors: _Node[];

  constructor(val?: number, neighbors?: _Node[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

function cloneGraph(node: _Node | null): _Node | null {
  if (!node) {
    return null;
  }

  // store mapping between original and copy nodes
  const src2cpy = new Map<_Node, _Node>();
  function dfs(n: _Node): _Node {
    // we do not use visited, since existing copy is a sign of visit
    // if node is visited, its copy must exist
    if (src2cpy.has(n)) return src2cpy.get(n)!;

    // for every node, create its copy
    // since we use visited, it will be created only once
    const cpy = new _Node(n.val);
    src2cpy.set(n, cpy);

    for (const nb of n.neighbors) {
      // since DFS returns copy of neighbor nb, we can push it to copy of "n", i.e. cpy
      cpy.neighbors.push(dfs(nb));
    }

    // return copy version of provided "n" node
    return cpy;
  }
  dfs(node);

  return src2cpy.get(node) ?? null;
}

/**
 * first working approach
 *  - first pass (DFS) creates copy of every node
 *  - second pass (BFS) sets neighbors
 *  - separate visited array is used
 */
function cloneGraph_first_attempt(node: _Node | null): _Node | null {
  if (!node) {
    return null;
  }

  const src2cpy = new Map<_Node, _Node>();
  let visited = new Array(100 + 1).fill(false);

  function dfs(n: _Node | null, visited: boolean[]) {
    if (!n) return;
    if (visited[n.val]) return;
    visited[n.val] = true;

    src2cpy.set(n, new _Node(n.val));

    for (const nb of n.neighbors) {
      dfs(nb, visited);
    }
  }
  dfs(node, visited);

  visited = new Array(100 + 1).fill(false);
  let currLvlVertices: _Node[] = [node];
  let nextLvlVertices: _Node[] = [];
  while (currLvlVertices.length > 0) {
    for (const v of currLvlVertices) {
      if (visited[v.val]) continue;
      visited[v.val] = true;

      const cpy = src2cpy.get(v)!;

      for (const nb of v.neighbors) {
        cpy.neighbors.push(src2cpy.get(nb)!);
        nextLvlVertices.push(nb);
      }
    }

    currLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
  }

  return src2cpy.get(node) ?? null;
}

export {};
