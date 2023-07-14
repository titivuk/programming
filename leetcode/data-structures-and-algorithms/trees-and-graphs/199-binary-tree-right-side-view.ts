import { TreeNode } from "./binary-tree.js";

// https://leetcode.com/problems/binary-tree-right-side-view/

// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

function rightSideView(root: TreeNode | null): number[] {
  if (!root) {
    return [];
  }

  let answer: number[] = [];
  let currLvlNodes = [root];

  while (currLvlNodes.length) {
    let nextLvlNodes: TreeNode[] = [];

    // simply put the rightmost node on every level
    answer.push(currLvlNodes[currLvlNodes.length - 1].val);

    for (let i = 0; i < currLvlNodes.length; i++) {
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
