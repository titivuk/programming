import { strictEqual } from "assert";

// https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/

function minReorder(n: number, connections: number[][]): number {
  // keep track of visited vertices
  const visited: boolean[] = new Array(n).fill(false);

  // remember initial roads
  // because the next step it to create undirected graph from the incoming tree
  const roads = new Set<string>();

  const adjacencyList = new Map<number, number[]>();
  for (let i = 0; i < n; i++) {
    adjacencyList.set(i, []);
  }
  for (const [from, to] of connections) {
    // build undirected graph
    adjacencyList.get(from)!.push(to);
    adjacencyList.get(to)!.push(from);

    // remember initial roads
    roads.add(`${from},${to}`);
  }

  function dfs(from: number) {
    let answer = 0;

    for (const neighbor of adjacencyList.get(from)!) {
      if (visited[neighbor] === false) {
        // PARENT to CHILD direction found
        if (roads.has(`${from},${neighbor}`)) {
          answer += 1;
        }

        visited[neighbor] = true;
        answer += dfs(neighbor);
      }
    }

    return answer;
  }

  // 1. input is a directed graph without cycles (looks like tree actually)
  // 2. we can consider the root = 0
  // 3. we can build undirected graph from the input and start from 0 and treat graph as a TREE with root = 0 !!!
  //    (all nodes reachable from the root because input nodes are connected with each other)
  // 4. to reach the root from any node - every direction should go from CHILD to PARENT (from tree perspective)
  // 5. so we apply DFS from the root and move from PARENT to CHILD (we need opposite direction, see p.4)
  // 6. also we remember or roads (directions) from input (connections)
  // 7. combining p.5 and p.6, if our input has direction from PARENT to CHILD,
  //    it must be flipped (see p.4)
  // !!! So, our task is to count the number of edges in a tree rooted at node '0' that are directed from the parent node to a child node.
  visited[0] = true;
  return dfs(0);
}

strictEqual(
  minReorder(6, [
    [0, 1],
    [1, 3],
    [2, 3],
    [4, 0],
    [4, 5],
  ]),
  3
);
