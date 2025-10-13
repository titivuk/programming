// https://leetcode.com/problems/word-search/

function exist(board: string[][], word: string): boolean {
  const m = board.length;
  const n = board[0].length;

  // NOTE we can get rid of visited matrix and just mark board[di][dj], for example board[di][dj] = '-';
  const visited: boolean[][] = new Array(m);
  for (let i = 0; i < m; i++) {
    visited[i] = new Array(n).fill(false);
  }

  const dirs = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], //  left
  ];

  function backtrack(curr: string[], i: number, j: number): boolean {
    // no need to check char by char, since we check every cell value before going there
    if (curr.length === word.length) {
      return true;
    }

    for (const d of dirs) {
      const di = i + d[0];
      const dj = j + d[1];

      if (0 <= di && di < m && 0 <= dj && dj < n) {
        // 1. check if we visited that cell before
        // 2. do not go to the cell if it does not have required character
        //      curr = [A, B]; word = [A, B, C] -> does not make sense to go (di, dj) if board[di][dj] !== 'C'
        if (!visited[di][dj] && board[di][dj] === word[curr.length]) {
          visited[di][dj] = true;
          curr.push(board[di][dj]);

          if (backtrack(curr, di, dj)) {
            return true;
          }

          curr.pop();
          visited[di][dj] = false;
        }
      }
    }

    return false;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // do not go to the cell if it does not have required character
      if (board[i][j] === word[0]) {
        visited[i][j] = true;
        if (backtrack([board[i][j]], i, j)) {
          return true;
        }
        visited[i][j] = false;
      }
    }
  }

  return false;
}
