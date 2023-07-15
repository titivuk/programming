import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/deepest-leaves-sum/description/

// Given the root of a binary tree, return the sum of values of its deepest leaves.

function deepestLeavesSum(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let answer = 0;
  let currLvlNodes: TreeNode[] = [root];

  while (currLvlNodes.length > 0) {
    // we don't care about sums from lvls except deepest
    // so reset answer until we reach the deepest lvl
    answer = 0;
    let nextLvlNodes: TreeNode[] = [];

    for (let i = 0; i < currLvlNodes.length; i++) {
      // sum values on the curr lvl
      answer += currLvlNodes[i].val;

      if (currLvlNodes[i].left) {
        nextLvlNodes.push(currLvlNodes[i].left!);
      }

      if (currLvlNodes[i].right) {
        nextLvlNodes.push(currLvlNodes[i].right!);
      }
    }

    currLvlNodes = nextLvlNodes;
  }

  return answer;
}

function deepestLeavesSumOnlyDeepest(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let currLvlNodes: TreeNode[] = [root];
  // put root here just to start while loop
  let nextLvlNodes: TreeNode[] = [root];

  while (nextLvlNodes.length > 0) {
    nextLvlNodes = [];

    for (let i = 0; i < currLvlNodes.length; i++) {
      if (currLvlNodes[i].left) {
        nextLvlNodes.push(currLvlNodes[i].left!);
      }

      if (currLvlNodes[i].right) {
        nextLvlNodes.push(currLvlNodes[i].right!);
      }
    }

    // do not lose deepest lvl
    if (nextLvlNodes.length > 0) {
      currLvlNodes = nextLvlNodes;
    }
  }

  // iterate over deepest lvl and sum values
  let answer = 0;
  for (let i = 0; i < currLvlNodes.length; i++) {
    answer += currLvlNodes[i].val;
  }

  return answer;
}
