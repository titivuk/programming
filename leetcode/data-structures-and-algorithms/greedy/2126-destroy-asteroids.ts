// https://leetcode.com/problems/destroying-asteroids/description/

import { strictEqual } from "node:assert";

function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
  asteroids.sort((a, b) => a - b);

  for (let i = 0; i < asteroids.length; i += 1) {
    if (asteroids[i] > mass) {
      return false;
    }

    mass += asteroids[i];
  }

  return true;
}

strictEqual(asteroidsDestroyed(10, [3, 9, 19, 5, 21]), true);
strictEqual(asteroidsDestroyed(5, [4, 9, 23, 4]), false);
