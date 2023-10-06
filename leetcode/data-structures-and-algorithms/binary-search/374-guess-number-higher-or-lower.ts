// https://leetcode.com/problems/guess-number-higher-or-lower/

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

declare function guess(num: number): number;

function guessNumber(n: number): number {
  let left = 0,
    right = n;

  let mid = 0;
  let guessResult = 0;
  while (left <= right) {
    mid = Math.ceil((left + right) / 2);

    guessResult = guess(mid);
    if (guessResult === 0) {
      return mid;
    }

    if (guessResult === -1) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
