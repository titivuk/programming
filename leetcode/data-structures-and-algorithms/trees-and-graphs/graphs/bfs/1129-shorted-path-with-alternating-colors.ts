// https://leetcode.com/problems/shortest-path-with-alternating-colors/

import { deepStrictEqual } from "assert";

function shortestAlternatingPaths(
  n: number,
  redEdges: number[][],
  blueEdges: number[][]
): number[] {
  const answer: number[] = new Array(n).fill(-1);

  const RED_EDGE = 0,
    BLUE_EDGE = 1;

  // Whenever we introduce new state variables, we need to also include those variables in visited.
  // So we treat (node, color) as one state and store those states in visited.
  const visited: boolean[][] = [];
  visited[RED_EDGE] = new Array(n).fill(false);
  visited[BLUE_EDGE] = new Array(n).fill(false);

  const graph = new Map<number, Array<[number, number]>>([[0, []]]);
  for (const [from, to] of redEdges) {
    if (graph.has(from) === false) {
      graph.set(from, []);
    }

    graph.get(from)!.push([to, RED_EDGE]);
  }
  for (const [from, to] of blueEdges) {
    if (graph.has(from) === false) {
      graph.set(from, []);
    }

    graph.get(from)!.push([to, BLUE_EDGE]);
  }

  // BFS start from 0
  // we add both combinations of color because we don't know what's the next color
  let currentLvlVertices: Array<[number, number]> = [
    [0, RED_EDGE],
    [0, BLUE_EDGE],
  ];
  visited[RED_EDGE][0] = true;
  visited[BLUE_EDGE][0] = true;
  let nextLvlVertices: Array<[number, number]> = [];

  let lvl = 0;
  while (currentLvlVertices.length > 0) {
    for (const [vertice, prevEdgeColor] of currentLvlVertices) {
      // first time we reach the vertice - it's the shortest path
      // we can visit it several since we check whether we visit the vertice + the edge color
      if (answer[vertice] === -1) {
        answer[vertice] = lvl;
      }

      let adjacentVertices = graph.get(vertice) ?? [];
      for (const [childVertice, edgeColor] of adjacentVertices) {
        if (
          prevEdgeColor !== edgeColor &&
          visited[edgeColor][childVertice] === false
        ) {
          visited[edgeColor][childVertice] = true;
          nextLvlVertices.push([childVertice, edgeColor]);
        }
      }
    }

    currentLvlVertices = nextLvlVertices;
    nextLvlVertices = [];
    lvl += 1;
  }

  return answer;
}

deepStrictEqual(
  shortestAlternatingPaths(
    3,
    [
      [0, 1],
      [0, 2],
    ],
    [[1, 0]]
  ),
  [0, 1, 1]
);
