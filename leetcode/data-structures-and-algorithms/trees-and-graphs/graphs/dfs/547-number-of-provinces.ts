import { strictEqual } from "assert";

// https://leetcode.com/problems/number-of-provinces/

function findCircleNum(isConnected: number[][]): number {
  // isConnected - adjacent matrix, we won't convert it to Adjacency list
  // instead we will check if isConnected[i][j] === 1 to check whether vertices are connected

  let answer = 0;
  // keep track of visited vertices
  const visited: boolean[] = new Array(isConnected.length).fill(false);

  // function that will take vertice index (row index)
  // and check every adjacent vertice by iterating over isConnected[i] array
  function dfs(i: number) {
    visited[i] = true;

    for (let j = 0; j < isConnected[i].length; j++) {
      // if vertice is connected and not yet visited
      // jump on that vertice
      if (isConnected[i][j] === 1 && visited[j] === false) {
        dfs(j);
      }
    }
  }

  // start from the very first node
  for (let i = 0; i < isConnected.length; i++) {
    // if vertice is not visited it means that it does not belong to any previously checked group
    // so we increament answer
    // and do dfs starting from that vertice
    if (visited[i] === false) {
      answer += 1;
      dfs(i);
    }
  }

  return answer;
}

strictEqual(
  findCircleNum([
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
  ]),
  1
);

strictEqual(
  findCircleNum([
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ]),
  2
);
