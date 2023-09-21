// https://leetcode.com/problems/reduce-arr-size-to-the-half/description/

function minSetSize(arr: number[]): number {
  let n = arr.length;

  let counter = new Map<number, number>();
  for (let i = 0; i < arr.length; i++) {
    counter.set(arr[i], (counter.get(arr[i]) ?? 0) + 1);
  }

  let sortedCounters: number[] = [];
  for (const pair of counter) {
    sortedCounters.push(pair[1]);
  }
  sortedCounters.sort((a, b) => b - a);

  let i = 0,
    currSize = n;

  for (i = 0; i < sortedCounters.length && currSize > n / 2; i++) {
    currSize -= sortedCounters[i];
  }

  return i;
}
