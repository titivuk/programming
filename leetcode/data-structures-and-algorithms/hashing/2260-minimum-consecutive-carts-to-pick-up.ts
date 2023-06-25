import { strictEqual } from "assert";

// https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up/

// You are given an integer array cards where cards[i] represents the value of the ith card.
// A pair of cards are matching if the cards have the same value.
// Return the minimum number of consecutive cards you have to pick up to have a pair of matching cards among the picked cards.
// If it is impossible to have matching cards, return -1.

function minimumCardPickup(cards: number[]): number {
  let result = Number.MAX_SAFE_INTEGER;

  const map = new Map<number, number>();
  for (let i = 0; i < cards.length; i++) {
    if (map.has(cards[i])) {
      result = Math.min(result, i - (map.get(cards[i]) as number) + 1);
    }

    map.set(cards[i], i);
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}

strictEqual(minimumCardPickup([3, 4, 2, 3, 4, 7]), 4);
strictEqual(minimumCardPickup([1, 0, 5, 3]), -1);
strictEqual(
  minimumCardPickup([
    95, 11, 8, 65, 5, 86, 30, 27, 30, 73, 15, 91, 30, 7, 37, 26, 55, 76, 60, 43,
    36, 85, 47, 96, 6,
  ]),
  3
);
