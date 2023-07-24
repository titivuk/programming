import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/evaluate-division/

function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  // build graph where edge that connect vertice A and B has weight = A / B
  // inner map value stores weight, so instead of A: [B] we have
  // A: {
  //        B: weight
  //    }
  const graph = new Map<string, Map<string, number>>();
  let numerator = "",
    denominator = "";
  for (let i = 0; i < equations.length; i++) {
    [numerator, denominator] = equations[i];

    if (graph.has(numerator) === false) {
      graph.set(numerator, new Map());
    }
    graph.get(numerator)!.set(denominator, values[i]);

    // make graph undirected
    if (graph.has(denominator) === false) {
      graph.set(denominator, new Map());
    }

    graph.get(denominator)!.set(numerator, 1 / values[i]);
  }

  function answerQuery(queryStart: string, queryEnd: string) {
    // if there is no such vertex in the graph
    // we can't calculate the answer
    if (graph.has(queryStart) === false) {
      return -1;
    }

    // start from queryStart and ratio = 1
    const stack: Array<[string, number]> = [[queryStart, 1]];
    const visited = new Set([queryStart]);

    // ITERATIVE DFS
    let vertex = "",
      ratio = 0;
    while (stack.length > 0) {
      [vertex, ratio] = stack.pop()!;

      // if current vertex == queryEnd
      // return calculated ratio
      if (vertex === queryEnd) {
        return ratio;
      }

      // apply DFS on the neighbors
      for (const [neighbor, value] of graph.get(vertex)!) {
        if (visited.has(neighbor) === false) {
          visited.add(neighbor);
          stack.push([neighbor, ratio * value]);
        }
      }
    }

    return -1;
  }

  const answer: number[] = [];
  for (const [numerator, denominator] of queries) {
    // for every query run independent traversal (DFS / BFS) with own visited tracking
    answer.push(answerQuery(numerator, denominator));
  }

  return answer;
}

deepStrictEqual(
  calcEquation(
    [
      ["a", "b"],
      ["b", "c"],
    ],
    [2.0, 3.0],
    [
      ["a", "c"],
      ["b", "a"],
      ["a", "e"],
      ["a", "a"],
      ["x", "x"],
    ]
  ),
  [6.0, 0.5, -1.0, 1.0, -1.0]
);
