function isValidSudoku(board: string[][]): boolean {
  const n = board.length;

  // validate rows and cols
  // at most 9 entries since [1,9] values added only
  const rowSet = new Set<string>();
  const colSet = new Set<string>();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // row
      if (board[i][j] !== ".") {
        if (rowSet.has(board[i][j])) {
          return false;
        } else {
          rowSet.add(board[i][j]);
        }
      }

      // col
      if (board[j][i] !== ".") {
        if (colSet.has(board[j][i])) {
          return false;
        } else {
          colSet.add(board[j][i]);
        }
      }
    }

    rowSet.clear();
    colSet.clear();
  }

  let rowOffset = 0;
  let colOffset = 0;
  for (let m = 0; m < 9; m++) {
    let si = 0;
    let sj = 0;
    const subboxSet = new Set<string>();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        si = i + rowOffset;
        sj = j + colOffset;

        if (board[si][sj] !== ".") {
          if (subboxSet.has(board[si][sj])) {
            return false;
          } else {
            subboxSet.add(board[si][sj]);
          }
        }
      }
    }
    subboxSet.clear();

    if (colOffset == 6) {
      rowOffset += 3;
      colOffset = 0;
    } else {
      colOffset += 3;
    }
  }

  return true;
}
