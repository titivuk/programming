// https://leetcode.com/problems/sum-of-square-numbers/description/?envType=list&envId=e9snhf4h

function judgeSquareSum(c: number): boolean {
  let left = 0,
    right = Math.ceil(Math.sqrt(c));

  let sum = 0;
  while (left <= right) {
    sum = left ** 2 + right ** 2;

    if (sum === c) {
      return true;
    }

    // if sum is too small
    // try bigger value
    if (sum < c) {
      left++;
    }
    // try smaller value
    else {
      right--;
    }
  }

  return false;
}
