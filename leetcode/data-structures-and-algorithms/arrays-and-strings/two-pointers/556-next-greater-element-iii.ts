function nextGreaterElement(n: number): number {
  // convert n into digits array
  let digits: number[] = n
    .toString()
    .split("")
    .map((d) => +d);

  /**
   * Now we will apply 31-next-permutation algorithm
   * (for explanation see the mentioned problem)
   */

  // find left element for swap
  let left = digits.length - 2;
  while (left >= 0 && digits[left] >= digits[left + 1]) left--;

  // if left === -1 - it means there is no next permutation > n
  // since we are not interested in cycle
  // we return immediately
  if (left === -1) {
    return -1;
  }

  // find right element and swap with left
  if (left >= 0) {
    let right = digits.length - 1;

    while (digits[right] <= digits[left]) right--;

    let tmp = digits[left];
    digits[left] = digits[right];
    digits[right] = tmp;
  }

  // reverse subarray [digits[left + 1], ..., digits[digits.lengt - 1]]
  let l = left + 1,
    r = digits.length - 1;
  let tmp = 0;
  while (l < r) {
    tmp = digits[l];
    digits[l] = digits[r];
    digits[r] = tmp;

    l++;
    r--;
  }

  // convert back to int
  let answer = Number.parseInt(digits.join(""), 10);

  // check if it's int
  if (answer > 2 ** 31 - 1) {
    return -1;
  }

  return answer;
}

nextGreaterElement(12443322);
