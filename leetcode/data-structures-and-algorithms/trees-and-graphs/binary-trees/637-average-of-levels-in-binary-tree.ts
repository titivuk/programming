import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/average-of-levels-in-binary-tree/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function averageOfLevels(root: TreeNode | null): number[] {
  if (!root) {
    return [];
  }

  let answer: number[] = [];

  let currLvlNodes: TreeNode[] = [root],
    nextLvlNodes: TreeNode[] = [];

  let currAvg = 0;
  while (currLvlNodes.length > 0) {
    currAvg = 0;

    for (const node of currLvlNodes) {
      currAvg += node.val;

      if (node.left) {
        nextLvlNodes.push(node.left);
      }

      if (node.right) {
        nextLvlNodes.push(node.right);
      }
    }

    currAvg /= currLvlNodes.length;
    answer.push(currAvg);

    currLvlNodes = nextLvlNodes;
    nextLvlNodes = [];
  }

  return answer;
}
