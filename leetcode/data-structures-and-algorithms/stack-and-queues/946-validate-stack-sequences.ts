import { deepStrictEqual } from "assert";

// https://leetcode.com/problems/validate-stack-sequences/

// Given two integer arrays pushed and popped each with distinct values,
// return true if this could have been the result of a sequence of push and pop operations on an initially empty stack,
// or false otherwise.

// this is another guy solution T_T
function validateStackSequences(pushed: number[], popped: number[]): boolean {
  const stack: number[] = [];

  let j = 0;
  for (const pushItem of pushed) {
    stack.push(pushItem);

    while (stack.length > 0 && stack[stack.length - 1] == popped[j]) {
      stack.pop();
      j += 1;
    }
  }

  return stack.length === 0;
}

// this is my solution T_T
function validateStackSequencesIterateThroughPopAndTwoPointers(
  pushed: number[],
  popped: number[]
): boolean {
  const stack: number[] = [];

  // index from which we start look at pushed array
  let left = 0;
  for (const popItem of popped) {
    // iterate over pushed elements that haven't been checked before (start from "left")
    // and try to find pushed[i] == popItem
    let right = -1;
    for (let i = left; i < pushed.length; i++) {
      if (pushed[i] === popItem) {
        right = i;
      }
    }

    // if pushed[i] == popItem found
    // push every item from in range [left, right)
    // (we don't actually need to push item at "right" index itself, since it's considered immediately popped out)
    if (right !== -1) {
      for (let i = left; i < right; i++) {
        stack.push(pushed[left]);
        left += 1;
      }

      // remember where we should start next time
      left = right + 1;
    }
    // if we did not find popItem in pushed array
    // it means that is must be already in stack
    else {
      let stackTop = -1;
      while (stack.length !== 0 && stackTop !== popItem) {
        stackTop = stack.pop() as number;
      }

      // if we didn't find popItem even in stack
      // it means that stack sequence is invalid
      if (stackTop !== popItem) {
        return false;
      }
    }
  }

  return true;
}

deepStrictEqual(
  validateStackSequencesIterateThroughPopAndTwoPointers(
    [1, 2, 3, 4, 5],
    [4, 5, 3, 2, 1]
  ),
  true
);
deepStrictEqual(
  validateStackSequencesIterateThroughPopAndTwoPointers(
    [1, 2, 3, 4, 5],
    [4, 3, 5, 1, 2]
  ),
  false
);
deepStrictEqual(
  validateStackSequencesIterateThroughPopAndTwoPointers(
    [4, 0, 1, 2, 3],
    [4, 2, 3, 0, 1]
  ),
  false
);
