import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/

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

function maxLevelSum(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  let currLvlNodes: TreeNode[] = [root],
    nextLvlNodes: TreeNode[] = [];

  let answer = 0,
    currLevel = 0,
    currSum = 0,
    maxSum = Number.NEGATIVE_INFINITY;
  while (currLvlNodes.length > 0) {
    currLevel += 1;
    currSum = 0;

    for (const node of currLvlNodes) {
      currSum += node.val;

      if (node.left) {
        nextLvlNodes.push(node.left);
      }

      if (node.right) {
        nextLvlNodes.push(node.right);
      }
    }

    if (currSum > maxSum) {
      maxSum = currSum;
      answer = currLevel;
    }

    currLvlNodes = nextLvlNodes;
    nextLvlNodes = [];
  }

  return answer;
}
