import { TreeNode } from "./binary-tree.js";

// https://leetcode.com/problems/find-largest-value-in-each-tree-row/

// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

function largestValues(root: TreeNode | null): number[] {
  if (!root) {
    return [];
  }

  let answer: number[] = [];
  let currLvlNodes: TreeNode[] = [root];

  let currLvlMax = Number.MIN_SAFE_INTEGER;
  while (currLvlNodes.length) {
    currLvlMax = Number.MIN_SAFE_INTEGER;
    let nextLvlNodes: TreeNode[] = [];

    for (let i = 0; i < currLvlNodes.length; i++) {
      currLvlMax = Math.max(currLvlMax, currLvlNodes[i].val);

      if (currLvlNodes[i].left) {
        nextLvlNodes.push(currLvlNodes[i].left!);
      }

      if (currLvlNodes[i].right) {
        nextLvlNodes.push(currLvlNodes[i].right!);
      }
    }

    answer.push(currLvlMax);
    currLvlNodes = nextLvlNodes;
  }

  return answer;
}
