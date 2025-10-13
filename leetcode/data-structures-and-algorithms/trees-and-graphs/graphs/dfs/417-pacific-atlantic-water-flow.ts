// https://leetcode.com/problems/pacific-atlantic-water-flow/

const dirs = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], //  left
];

export function pacificAtlantic(heights: number[][]): number[][] {
  const m = heights.length;
  const n = heights[0].length;
  const answer: number[][] = [];

  function dfs(i: number, j: number, visited: boolean[][]) {
    if (visited[i][j]) {
      return;
    }
    visited[i][j] = true;

    for (const d of dirs) {
      const nexti = i + d[0];
      const nextj = j + d[1];

      // here comparison is reversed, since we are traversing from sea to cell
      // so we a looking for a higher neigbors
      if (
        isValid(nexti, nextj, m, n) &&
        heights[nexti][nextj] >= heights[i][j]
      ) {
        dfs(nexti, nextj, visited);
      }
    }
  }

  // IDEA
  // we are asked to check if cell is connected to the seas
  // border cells are connected to some sea
  // do not start from every possible cell
  // instead, start from border cells - all cells you can reach are transitively connected to the sea

  let pacificVisited = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => false)
  );
  // pacific top
  for (let i = 0; i < m; i++) {
    dfs(i, 0, pacificVisited);
  }
  // pacific left
  for (let j = 1; j < n; j++) {
    dfs(0, j, pacificVisited);
  }

  const atlanticVisited = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => false)
  );
  // atlantic right
  for (let i = 0; i < m - 1; i++) {
    dfs(i, n - 1, atlanticVisited);
  }
  // atlantic bot
  for (let j = 0; j < n; j++) {
    dfs(m - 1, j, atlanticVisited);
  }

  // collect answer. cell is connected with pacific and atlantic ocean if we it is visited from both oceans
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacificVisited[i][j] && atlanticVisited[i][j]) {
        answer.push([i, j]);
      }
    }
  }

  return answer;
}

function isValid(i: number, j: number, m: number, n: number): boolean {
  return 0 <= i && i < m && 0 <= j && j < n;
}
