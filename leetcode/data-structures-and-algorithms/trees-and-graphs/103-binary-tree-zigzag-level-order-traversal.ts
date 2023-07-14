import { TreeNode } from "./binary-tree.js";

// https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/

// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
// (i.e., from left to right, then right to left for the next level and alternate between).

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) {
    return [];
  }

  let answer: number[][] = [];
  let currLvlNodes: TreeNode[] = [root];
  let nextLvlNodes: TreeNode[] = [];
  let currLvlOrderedValues: number[] = [];

  // determine order for every lvl
  let leftToRight = true;
  while (currLvlNodes.length > 0) {
    nextLvlNodes = [];
    currLvlOrderedValues = [];

    // stack approach, start from the end and push to the end for the next lvl
    for (let i = currLvlNodes.length - 1; i >= 0; i--) {
      currLvlOrderedValues.push(currLvlNodes[i].val);

      if (leftToRight) {
        if (currLvlNodes[i].left) nextLvlNodes.push(currLvlNodes[i].left!);
        if (currLvlNodes[i].right) nextLvlNodes.push(currLvlNodes[i].right!);
      } else {
        if (currLvlNodes[i].right) nextLvlNodes.push(currLvlNodes[i].right!);
        if (currLvlNodes[i].left) nextLvlNodes.push(currLvlNodes[i].left!);
      }
    }

    // add current lvl to the answer
    answer.push(currLvlOrderedValues);

    currLvlNodes = nextLvlNodes;
    // switch order for the next lvl
    leftToRight = !leftToRight;
  }

  return answer;
}
