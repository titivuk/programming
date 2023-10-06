// https://leetcode.com/problems/divide-chocolate/description/

function maximizeSweetness(sweetness: number[], k: number): number {
  function check(minSweetness: number) {
    // try to cut chocolate in k + 1 pieces (for you and for k your friends)
    let pieces = 0;
    let currSweetness = 0;
    for (let i = 0; i < sweetness.length; i++) {
      currSweetness += sweetness[i];

      // if piece is already gte than min possible sweetness
      // create the next piece
      if (currSweetness >= minSweetness) {
        currSweetness = 0;
        pieces += 1;
      }
    }

    // return true if it's possible to cut chocolate into k + 1 pieces
    // where every piece sweetness >= minSweetness
    return pieces >= k + 1;
  }

  // we are looking for maximum minimum sweetness
  // maximum - from all possible solution
  // minimum - minimum across all other chocolate pieces

  // min possible minSweetness
  let left = 1,
    // max minSweetness
    right = sweetness.length * Math.max(...sweetness);

  let mid = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    // since we are looking for max value index modifications are reversed
    if (check(mid)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // since we are looking for max value - right index is the answer
  return right;
}

maximizeSweetness([1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
