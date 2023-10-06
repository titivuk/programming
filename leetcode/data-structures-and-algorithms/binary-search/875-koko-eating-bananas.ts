// https://leetcode.com/problems/koko-eating-bananas/description/

// on solution spaces problem
function minEatingSpeed(piles: number[], h: number): number {
  function check(speed: number) {
    let hoursSpent = 0;

    for (let pile of piles) {
      hoursSpent += Math.ceil(pile / speed);
    }

    return hoursSpent <= h;
  }

  // define min and max possible solutions
  // the answer is value from [1, Math.max(...piles)] range
  // treat that range as sorted array and apply binary search
  let left = 1,
    // max pile value is maximum possible, because there is a constraint "piles.length <= h"
    // which tells us that we have 1 hour for every pile
    // so if we pick biggest pile as speed, then we will eat everything for pile.length hours
    right = Math.max(...piles);

  let mid = 0;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    // check every mid value (which is speed) whether it's enough to eat all bananas
    if (check(mid)) {
      // if mid speed is enough, try to find lesser acceptable speed
      right = mid - 1;
    } else {
      // if mid value is not enough, we need higher speed, so check right part of the possible solutions
      left = mid + 1;
    }
  }

  return left;
}
