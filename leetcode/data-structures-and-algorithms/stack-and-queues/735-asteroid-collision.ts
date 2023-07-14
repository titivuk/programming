import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/asteroid-collision/

// We are given an array asteroids of integers representing asteroids in a row.
// For each asteroid, the absolute value represents its size,and the sign represents its direction (positive meaning right, negative meaning left).
// Each asteroid moves at the same speed.
// Find out the state of the asteroids after all collisions.
// If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

function asteroidCollisionFirstSolution(asteroids: number[]): number[] {
  const stack: number[] = [];

  for (const ast of asteroids) {
    stack.push(ast);

    while (stack.length > 1) {
      let right = stack.pop() as number;
      let left = stack.pop() as number;
      // left asteroid goes right
      // right asteroid goes left
      if (Math.sign(left) === 1 && Math.sign(right) === -1) {
        // if left bigger -> push it back
        if (Math.abs(left) > Math.abs(right)) {
          stack.push(left);
        }
        // if right bigger -> push it back
        else if (Math.abs(left) < Math.abs(right)) {
          stack.push(right);
        }

        // if they are equal - do nothing
      } else {
        stack.push(left);
        stack.push(right);

        // nasty break
        break;
      }
    }
  }

  return stack;
}

function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = [];

  for (const ast of asteroids) {
    // no collision possible when asteroid goes right
    if (ast > 0) {
      stack.push(ast);
    }
    // in this block right asteroid always goes left
    else {
      while (
        stack.length > 0 &&
        // left asteroid goes right -> asteroids go to opposite directions
        stack[stack.length - 1] > 0 &&
        // right asteroid bigger than left asteroid
        Math.abs(ast) > Math.abs(stack[stack.length - 1])
      ) {
        // remove left asteroid from stack
        stack.pop();
      }

      // if stack is empty or left asteroid goes left direction (in the same direction goes right)
      // add right asteroid to the stack
      if (stack.length === 0 || stack[stack.length - 1] < 0) {
        stack.push(ast);
      }
      // if there is left asteroid with the same size as right, but direction is opposite
      // remove from the stack since equal asteroids destroy each other
      else if (stack[stack.length - 1] === -ast) {
        stack.pop();
      }
    }
  }

  return stack;
}

deepStrictEqual(asteroidCollision([5, 10, -5]), [5, 10]);
deepStrictEqual(asteroidCollision([8, -8]), []);
deepStrictEqual(asteroidCollision([10, 2, -5]), [10]);
deepStrictEqual(asteroidCollision([-2, -1, 1, 2]), [-2, -1, 1, 2]);
deepStrictEqual(asteroidCollision([-2, -2, 1, -2]), [-2, -2, -2]);
