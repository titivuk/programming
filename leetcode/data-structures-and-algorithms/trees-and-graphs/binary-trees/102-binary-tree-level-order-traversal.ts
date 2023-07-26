import { TreeNode } from "./tree-node.js";

// https://leetcode.com/problems/binary-tree-level-order-traversal/

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

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) {
    return [];
  }

  const answer: number[][] = [];

  let currLvlNodes: TreeNode[] = [root],
    nextLvlNodes: TreeNode[] = [];

  let i = 0;
  while (currLvlNodes.length > 0) {
    answer[i] = [];

    for (const node of currLvlNodes) {
      answer[i].push(node.val);

      if (node.left) {
        nextLvlNodes.push(node.left);
      }

      if (node.right) {
        nextLvlNodes.push(node.right);
      }
    }

    currLvlNodes = nextLvlNodes;
    nextLvlNodes = [];

    i += 1;
  }

  return answer;
}
