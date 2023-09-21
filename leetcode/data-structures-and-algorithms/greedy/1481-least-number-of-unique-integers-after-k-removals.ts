import { strictEqual } from "assert";

// https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/submissions/

function findLeastNumOfUniqueInts(arr: number[], k: number): number {
  // count occurence of every num
  let numCounter = new Map<number, number>();
  for (let i = 0; i < arr.length; i++) {
    numCounter.set(arr[i], (numCounter.get(arr[i]) ?? 0) + 1);
  }

  // sort nums by its counter ASC
  // if counters are equal, then sort by num value (to store the same value together)
  // i.e. [1, 2, 3, 2, 3] -> [1, 2, 2, 3, 3]
  arr.sort((a, b) => {
    let aCounter = numCounter.get(a) as number;
    let bCounter = numCounter.get(b) as number;

    if (aCounter === bCounter) {
      return a - b;
    }

    return aCounter - bCounter;
  });

  // if we want to have LEAST possible amount of unique integers it makes sense to remove those with least counter first
  // k times decrement counter of the smallest num
  // since arr is sorted by num counter ASC we always subrtract from the smallest possible num counter
  for (let i = 0; i < k; i++) {
    numCounter.set(arr[i], (numCounter.get(arr[i]) as number) - 1);
  }

  // count number of integers which are not completelly removed
  let answer = 0;
  for (let [, counter] of numCounter) {
    if (counter > 0) {
      answer += 1;
    }
  }

  return answer;
}

strictEqual(
  findLeastNumOfUniqueInts(
    [
      24, 119, 157, 446, 251, 117, 22, 168, 374, 373, 323, 311, 441, 213, 120,
      412, 200, 236, 328, 24, 164, 104, 331, 32, 19, 223, 89, 114, 152, 82, 456,
      381, 355, 343, 157, 245, 443, 368, 229, 49, 82, 16, 373, 142, 240, 125, 8,
    ],
    41
  ),
  3
);
