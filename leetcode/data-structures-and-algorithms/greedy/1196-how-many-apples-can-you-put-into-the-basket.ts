// https://leetcode.com/problems/how-many-apples-can-you-put-into-the-basket/description/

function maxNumberOfApples(weight: number[]): number {
  weight.sort((a, b) => a - b);

  let currWeight = 0,
    i = 0;
  while (i < weight.length && currWeight + weight[i] <= 5000) {
    currWeight += weight[i];
    i += 1;
  }

  return i;
}
