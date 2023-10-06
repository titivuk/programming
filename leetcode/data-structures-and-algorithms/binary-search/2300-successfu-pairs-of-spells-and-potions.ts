// https://leetcode.com/problems/successful-pairs-of-spells-and-potions/

function successfulPairs(
  spells: number[],
  potions: number[],
  success: number
): number[] {
  // sort potions to use biunary search for every spell
  potions.sort((a, b) => a - b);

  let pairs: number[] = new Array(spells.length).fill(0);

  for (let i = 0; i < spells.length; i++) {
    // calculate target
    // we want to find gte potions
    let target = Math.ceil(success / spells[i]);
    let left = 0,
      right = potions.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (target > potions[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    // since order is sorted, every potion on the right side bigger gte than target
    // left is equal to insertion point of the value
    pairs[i] = potions.length - left;
  }

  return pairs;
}

successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7);
